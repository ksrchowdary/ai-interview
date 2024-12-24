export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export function handleAuthError(error: unknown): never {
  if (error instanceof AuthError) throw error;
  
  if (error instanceof Error) {
    throw new AuthError(error.message);
  }
  
  throw new AuthError('An unknown authentication error occurred');
}