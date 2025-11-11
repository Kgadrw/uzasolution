import { z } from 'zod';
import { connectToDatabase } from '../../../../../lib/db';
import { validateRequest } from '../../../../../lib/validation';
import { signAccessToken, verifyPassword } from '../../../../../lib/auth';
import { emitEvent } from '../../../../../lib/events';
import { User } from '../../../../../models/User';
import { ApiError, errorResponse } from '../../../../../lib/errors';

const loginSchema = z
  .object({
    phone: z.string().min(7).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8),
  })
  .refine((data) => data.phone || data.email, {
    message: 'Provide either phone or email to login',
    path: ['phone'],
  });

export async function POST(request) {
  try {
    const payload = await validateRequest(request, loginSchema);

    await connectToDatabase();

    const user = await User.findOne(
      payload.phone ? { phone: payload.phone } : { email: payload.email },
    );

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const validPassword = await verifyPassword(payload.password, user.passwordHash);
    if (!validPassword) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = signAccessToken({
      userId: user.id,
      role: user.role,
      orgId: user.orgId,
    });

    emitEvent('user.login', { userId: user.id, role: user.role });

    return Response.json({
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
    });
  } catch (error) {
    return errorResponse(error);
  }
}
