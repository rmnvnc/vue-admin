import { postLogin, getMe } from '@/api/authApi'
import type { User } from '@/types/User'
import { AppError } from '@/types/AppError'

export class AuthService {
    async login(username: string, password: string): Promise<User> {
        const data = await postLogin(username, password)

        if (!data.success) {
            throw new AppError(data.error || 'Neúspešný login', 400, 'AUTH_FAILURE')
        }

        return {
            id: data.id,
            login: data.login,
            email: data.email,
            token: data.token
        }
    }

    async me(): Promise<User> {
        const data = await getMe()

        if (!data.success) {
            throw new AppError(data.error || 'Neúspešný autologin', 400, 'AUTH_FAILURE')
        }

        return {
            id: data.id,
            login: data.login,
            email: data.email,
            token: data.token
        }
    }
}