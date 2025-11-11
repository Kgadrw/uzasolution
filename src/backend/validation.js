"use server";

import { ZodError } from "zod";
import { ApiError } from "./errors";

export async function validateRequest(request, schema) {
  let data;
  try {
    data = await request.json();
  } catch (error) {
    throw new ApiError(400, "Invalid JSON payload");
  }

  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      throw new ApiError(422, "Validation failed", formatted);
    }
    throw error;
  }
}

