export class ApiError extends Error {
  constructor(status = 500, message = 'Internal Server Error', details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function assert(condition, status, message, details) {
  if (!condition) {
    throw new ApiError(status, message, details);
  }
}

export function errorResponse(error) {
  if (error instanceof ApiError) {
    return Response.json(
      {
        error: error.message,
        details: error.details ?? undefined,
      },
      { status: error.status },
    );
  }

  console.error('[API_ERROR]', error);
  return Response.json(
    {
      error: 'Internal Server Error',
    },
    { status: 500 },
  );
}
