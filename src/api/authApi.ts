import { apiRoutes } from '@/constants/apiRoutes'
import { apiClient } from './apiClient'

export const postLogin = async (username: string, password: string) => {
    return apiClient(apiRoutes.auth, {
        method: 'POST',
        body: JSON.stringify({ username, password })
    })
}

export const getMe = async () => {
    return apiClient(apiRoutes.me)
}