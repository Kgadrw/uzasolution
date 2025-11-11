import { z } from 'zod';
import { ApiError } from './errors';

export function validate(schema, payload) {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, 'Validation failed', error.flatten());
    }
    throw error;
  }
}

export async function validateRequest(request, schema) {
  const data = await request.json();
  return validate(schema, data);
}
