import { components } from './generated/index';

export type SitemapNode = components['schemas']['SitemapNode']
export type ErrorDetail = components['schemas']['ErrorDetail']
export type ErrorCode = components['schemas']['ErrorCode']
export type User = components['schemas']['User']
export type ApiError = components['schemas']['ApiError']
export type FormField = components['schemas']['FormField']

// generic api response wrapper
export interface ApiResponse<T> {
  data: T
  error?: ApiError
}

// runtime trieda na throw/catch api errorov
export class AppError extends Error {
    constructor(
        // A human-readable message describing the error
        public message: string,
        // The HTTP status code associated with the error
        public status: number = 0,
        // A machine-readable error code
        public code: ErrorCode = "UNKNOWN_ERROR",
        // Optional additional information about the error
        options?: { cause?: unknown; details?: ErrorDetail[] }
    ) {
        super(message, options)
        this.name = 'AppError'
    }
}
