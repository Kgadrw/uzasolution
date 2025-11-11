"use server";

import { z } from "zod";
import { connectToDatabase } from "../../../../../backend/db/connection";
import User from "../../../../../backend/db/models/user";
import { signToken, verifyPassword } from "../../../../../backend/auth";
import { errorResponse, ApiError } from "../../../../../backend/errors";
import { validateRequest } from "../../../../../backend/validation";
import { serializeUser } from "../../../../../backend/dto";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request) {
  try {
    const payload = await validateRequest(request, loginSchema);

    await connectToDatabase();

    const user = await User.findOne({ email: payload.email.toLowerCase() });
    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isValid = await verifyPassword(payload.password, user.passwordHash);
    if (!isValid) {
      throw new ApiError(401, "Invalid credentials");
    }

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
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

