import { z } from 'zod';
import { connectToDatabase } from '../../../../../lib/db';
import { validateRequest } from '../../../../../lib/validation';
import { hashPassword, signAccessToken } from '../../../../../lib/auth';
import { emitEvent } from '../../../../../lib/events';
import { notify } from '../../../../../lib/notifications';
import { User } from '../../../../../models/User';
import { ApiError, errorResponse } from '../../../../../lib/errors';

const registerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional(),
  password: z.string().min(8),
  role: z.enum(['beneficiary', 'donor', 'admin']).default('beneficiary'),
  orgId: z.string().optional(),
  kycDocuments: z
    .array(
      z.object({
        type: z.string(),
        url: z.string().url(),
      }),
    )
    .optional()
    .default([]),
});

export async function POST(request) {
  try {
    const payload = await validateRequest(request, registerSchema);

    await connectToDatabase();

    const duplicateUser = await User.findOne({
      $or: [
        { phone: payload.phone },
        ...(payload.email ? [{ email: payload.email }] : []),
      ],
    });

    if (duplicateUser) {
      throw new ApiError(409, 'User already exists with provided phone or email');
    }

    const passwordHash = await hashPassword(payload.password);

    const user = await User.create({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      role: payload.role,
      orgId: payload.orgId,
      passwordHash,
      kycStatus: 'pending',
      kycDocuments: payload.kycDocuments,
    });

    emitEvent('user.registered', { userId: user.id, role: user.role });
    notify('admin', 'New user registration awaiting KYC verification', {
      userId: user.id,
      role: user.role,
    });

    const token = signAccessToken({
      userId: user.id,
      role: user.role,
      orgId: user.orgId,
    });

    return Response.json(
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
          orgId: user.orgId,
          kycStatus: user.kycStatus,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
