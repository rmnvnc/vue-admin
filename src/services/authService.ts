import { postLogin, getMe, getLogout } from '@/api/authApi'
import type { User } from '@/types/User'
import { AppError } from '@/types/AppError'

export class AuthService {
    async login(username: string, password: string): Promise<User> {
        const response = await postLogin(username, password)

        const user = response.data! as User

        return {
            id: user.id,
            login: user.login,
            email: user.email,
            token: user.token
        }   
    }

    async me(): Promise<User> {
        const response = await getMe()

        const me = response.data! as User

        return {
            id: me.id,
            login: me.login,
            email: me.email,
            token: me.token
        }
    }

    async logout(): Promise<void>{
        try {
            await getLogout(); // nečakáš success = true, pretože logout je pasívny
            // REMOVE TOKEN FROM LOCAL STORAGE
        } catch (err) {
            throw new AppError('Neúspešný logout', 400, 'LOGOUT_FAILURE');
        }
        
    }
}