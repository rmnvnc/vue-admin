export type ErrorCode =  
    | 'UNKNOWN_ERROR'
    | 'VALIDATION_ERROR'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'SERVER_ERROR'
    | 'NETWORK_ERROR'
    | 'LOGOUT_FAILURE';

export class AppError extends Error {
    constructor(
        // A human-readable message describing the error
        public message: string,
        // The HTTP status code associated with the error
        public status: number = 0,
        // A machine-readable error code
        public code: ErrorCode = 'UNKNOWN_ERROR',
        // Optional additional information about the error
        options?: { cause?: unknown; details?: Record<string, unknown> }
    ) {
        super(message, options)
        this.name = 'AppError'
    }
}