import { login } from '@/api/authApi'
import type { User } from '@/types/User'

export class AuthService {
    async login(username: string, password: string): Promise<User> {
        const { ok, data } = await login(username, password)

        if (!ok || !data.success) {
            throw new Error(data.error || 'Nastala chyba')
        }

        return {
            id: data.id,
            login: data.login,
            email: data.email,
            token: data.token
        }
    }
}