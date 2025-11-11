"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors";
import { connectToDatabase } from "../db/connection";
import User from "../db/models/user";

const TOKEN_TTL = "12h";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable");
  }
  return jwt.sign(payload, secret, { expiresIn: TOKEN_TTL });
}

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable");
  }
  return jwt.verify(token, secret);
}

export async function getAuthContext(request) {
  const authHeader = request.headers.get("authorization") || "";
  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new ApiError(401, "Missing authorization token");
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }

  await connectToDatabase();
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  return {
    user: {
      id: user.id,
      role: user.role,
      orgId: user.orgId ?? null,
      kycStatus: user.kycStatus,
    },
  };
}

export async function requireAuth(request, roles = undefined) {
  const context = await getAuthContext(request);
  if (roles && !roles.includes(context.user.role)) {
    throw new ApiError(403, "Forbidden");
  }

  return context;
}

