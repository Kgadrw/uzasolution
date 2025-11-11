"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../backend/db/connection";
import User from "../../../../../backend/db/models/user";
import { hashPassword, signToken } from "../../../../../backend/auth";
import { emitEvent } from "../../../../../backend/events";
import { ApiError, errorResponse } from "../../../../../backend/errors";
import { validateRequest } from "../../../../../backend/validation";
import { serializeUser } from "../../../../../backend/dto";

const registerSchema = z.object({
  name: z.string().min(3).max(120),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(8),
  role: z.enum(["beneficiary", "donor"]),
  orgId: z.string().optional(),
  kycDocuments: z
    .array(
      z.object({
        type: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
});

export async function POST(request) {
  try {
    const payload = await validateRequest(request, registerSchema);

    await connectToDatabase();

    const existing = await User.findOne({ email: payload.email.toLowerCase() });
    if (existing) {
      throw new ApiError(409, "Email is already registered");
    }

    const passwordHash = await hashPassword(payload.password);

    const user = await User.create({
      name: payload.name,
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      passwordHash,
      role: payload.role,
      orgId: payload.orgId,
      kycStatus: "pending",
      kycDocuments: payload.kycDocuments,
    });

    emitEvent("user.registered", { userId: user.id, role: user.role });

    const token = signToken({
      userId: user.id,
      role: user.role,
      orgId: user.orgId ?? null,
    });

    return Response.json(
      {
        token,
        user: serializeUser(user),
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

