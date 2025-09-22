import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
         {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/AuthView.vue')
        },
    ],
})

router.beforeEach(function(to, _, next) {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.user) {
        if (to.fullPath === '/') {
            return next({
                name: 'login',
                replace: true
            });
        }
        return next({
            name: 'login',
            query: { redirect: to.fullPath },
            replace: true
        });
    } else if(to.name === 'login' && auth.user) {
        return next({
            name: 'home',
            replace: true
        });
    } else {
        next()
    }
})

export default router
