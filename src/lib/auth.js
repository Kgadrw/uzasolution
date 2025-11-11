import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from './db';
import { ApiError } from './errors';
import { User } from '../models/User';

const JWT_EXPIRY = '12h';

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable');
  }
  return process.env.JWT_SECRET;
}

export function signAccessToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRY });
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired token');
  }
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function parseAuthorizationHeader(request) {
  const authorization = request.headers.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ApiError(401, 'Missing bearer token');
  }
  return authorization.replace('Bearer ', '').trim();
}

export async function requireAuth(request, roles = []) {
  const token = parseAuthorizationHeader(request);
  const decoded = verifyAccessToken(token);

  await connectToDatabase();
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new ApiError(401, 'User not found for token');
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    throw new ApiError(403, 'Insufficient permissions for this resource');
  }

  return { user, tokenPayload: decoded };
}
