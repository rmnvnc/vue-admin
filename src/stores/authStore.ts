import { defineStore } from 'pinia'
import { computed, reactive} from 'vue'
import { User } from '@/types/User'
import { apiRoutes } from '@/constants/apiRoutes'
import { AuthService } from '@/services/authService'

const authService = new AuthService()

export const useAuthStore = defineStore('auth', () => {
    const user = reactive<User>({
        id: null,
        login: null,
        email: null,
        token: null
    })

    const isAuthenticated = computed(() => !!user.id)

    const login = async ({ username, password }: {username: string; password: string}) => {

        const result = await authService.login(username, password)

        setUser(result);
    }

    const autoLogin = async () => {
        const response = await fetch(apiRoutes.me, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Chyba pri prihlásení')
        }

        setUser(data);
    }

    const logout = () => {
        setUser({ id: null, login: null, email: null, token: null })
    }

    const setUser = ({id, login, email, token}: Partial<User>) => {
        user.id = id ?? null
        user.login = login ?? null
        user.email = email ?? null
        user.token = token ?? null
    }

    return {
        user,
        isAuthenticated,
        login,
        autoLogin,
        logout
    }
})
