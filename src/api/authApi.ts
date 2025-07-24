import { apiRoutes } from '@/constants/apiRoutes'

export const login = async (username: string, password: string) => {
    const response = await fetch(apiRoutes.auth, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credetinials: 'include',
        body: JSON.stringify({username, password})
    })

    const data = await response.json()
    return {
        status: response.status,
        ok: response.ok,
        data
    }
}