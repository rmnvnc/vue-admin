import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = reactive({
        id: null,
        login: null,
        email: null,
        token: null
    })

    const isAuthenticated = computed(() => !!user.token)

    const login = async ({ username, password }) => {
        console.log(username, password)
        let url = '/admin/rest/service/authenticate'

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })

        const data = await response.json()

        console.log(response.status);

        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Chyba pri prihlásení')
        }

        user.id = data.id || null
        user.login = data.login || null
        user.email = data.email || null
        user.token = data.token || null
    }

    const logout = () => {
        user.id = null,
        user.login = null,
        user.email = null,
        user.token = null
    }

    return {
        user,
        isAuthenticated,
        login,
        logout
    }
})
