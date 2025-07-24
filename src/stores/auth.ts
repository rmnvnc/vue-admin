import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { User } from '@/types/User'


export const useAuthStore = defineStore('auth', () => {
    const user = reactive<User>({
        id: null,
        login: null,
        email: null,
        token: null
    })

    const apiUrl = '/admin/rest/service/authenticate'

    const isAuthenticated = computed(() => !!user.id)

    const login = async ({ username, password }: {username: string; password: string}) => {

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Chyba pri prihlásení')
        }

        setUser(data);
    }

    const autoLogin = async () => {
        const response = await fetch(apiUrl, {
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
