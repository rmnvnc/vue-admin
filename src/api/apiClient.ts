import { AppError } from '@/types/AppError'
import type { ApiResponse } from '@/types/ApiResponse'

export const apiClient = async <T = any>(
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

        if (!res.ok || !data.success) {
            const message = data.error?.message || res.statusText || 'Neznáma chyba'
            const code = data.error?.code || 'UNKNOWN_ERROR'
            throw new AppError(message, res.status, code, { cause: data })
        }

        return data
    } catch (err: any) {
       if (err instanceof AppError) throw err
        throw new AppError(
            err?.message || 'Sieťová chyba', 
            err?.status ?? 0, 
            err?.code ?? 'NETWORK_ERROR',
            { cause: err }
        )
    }
}