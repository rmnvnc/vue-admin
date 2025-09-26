import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { AuthService } from '@/services/authService'
import router from '@/router'

const authService = new AuthService()

export const useAuthStore = defineStore('auth', () => {
    // User je buď načítaný objekt, alebo null
    const user = ref<User | null>(null)
    const isAuthenticated = computed(() => !!user.value)

    const login = async ({ username, password }: {username: string; password: string}) => {
        const result = await authService.login(username, password)
        setUser(result);
    }

    const autoLogin = async () => {
        const result = await authService.me()
        setUser(result);
    }

    const logout = async () => {
        await authService.logout()
        clearUser()
        router.push({ name: 'login' })
    }

    const setUser = (newUser: User) => {
        user.value = newUser
    }

    const clearUser = () => {
        user.value = null
    }

    return {
        user,
        login,
        autoLogin,
        logout,
        isAuthenticated
    }
})
