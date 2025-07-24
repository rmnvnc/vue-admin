import { AppError } from '@/types/AppError'

export const apiClient = async <T = any>(
    url: string,
    options?: RequestInit
): Promise<T> => {
    try {
        const res = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            ...options
        })

        const contentType = res.headers.get('Content-Type')
        const isJson = contentType?.includes('application/json')

        const data = isJson ? await res.json() : null

        if (!res.ok) {
            const message = data?.error || res.statusText || 'Neznáma chyba'
            throw new AppError(message, res.status)
        }

        return data
    } catch (err: any) {
        if (err instanceof AppError) throw err
        throw new AppError(err.message || 'Sieťová chyba', 0)
    }
}