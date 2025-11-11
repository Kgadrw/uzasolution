"use server";

export class ApiError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function errorResponse(error) {
  if (error instanceof ApiError) {
    return Response.json(
      { error: error.message, details: error.details },
      { status: error.statusCode }
    );
  }

  console.error(error);
  return Response.json({ error: "Internal server error" }, { status: 500 });
}

