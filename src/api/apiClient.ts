import { AppError } from '@/types/AppError'
import type { ErrorCode } from '@/types/AppError'
import type { ApiResponse } from '@/types/ApiResponse'

export const apiClient = async <T = unknown>(
    url: string,
    options?: RequestInit
): Promise<ApiResponse<T>> => {
    try {
        const mergedOptions: RequestInit = {
            credentials: 'include',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options?.headers as Record<string, string> | undefined)
            }
        }

        const res = await fetch(url, mergedOptions)

        const contentType = res.headers.get('Content-Type')
        const isJson = contentType?.includes('application/json')

        const data: ApiResponse<T> =
            isJson
                ? (await res.json()) as ApiResponse<T>
                : ({ data: null } as ApiResponse<T>)

        if (!res.ok) {
            const message = data.error?.message || res.statusText || 'Neznáma chyba'
            const code = data.error?.code as ErrorCode || 'UNKNOWN_ERROR'
            throw new AppError(message, res.status, code, { cause: data })
        }

        return data
    } catch (err: unknown) {
        if (err instanceof AppError) throw err
        const AppErr = err as AppError
        throw new AppError(
            AppErr?.message || 'Sieťová chyba',
            AppErr?.status ?? 0,
            AppErr?.code ?? 'NETWORK_ERROR',
            { cause: err }
        )
    }
}
