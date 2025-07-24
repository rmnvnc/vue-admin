import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())


const authStore = useAuthStore()

// Počkaj na autoLogin ešte pred mountom
authStore.autoLogin().catch(() => {
    // pokojne ignoruj error (napr. not logged in)
}).finally(() => {
    app.use(router)
    app.mount('#app')
})
