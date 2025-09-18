export class AppError extends Error {
    constructor(
        public message: string,
        public status: number = 0,
        public code: string = 'UNKNOWN_ERROR',
        options?: { cause?: unknown }
    ) {
        super(message, options)
        this.name = 'AppError'
    }
}