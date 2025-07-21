import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'userAuth',
            component: AuthView,
        },
    ],
})

export default router
