export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const errorHandler = (error: any) => {
  if (error instanceof ApiError) {
    return {
      status: 'error',
      statusCode: error.statusCode,
      error: error.message,
      details: error.details
    };
  }

  // Default error
  return {
    status: 'error',
    statusCode: 500,
    error: 'Internal Server Error',
    details: error.message
  };
}; 