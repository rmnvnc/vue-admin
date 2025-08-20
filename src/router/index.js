import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
         {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true}
        },
        {
            path: '/login',
            name: 'login',
            component: AuthView
        },
    ],
})

router.beforeEach(function(to, _, next) {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
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
    } else if(to.name === 'login' && auth.isAuthenticated) {
        return next({
            name: 'home',
            replace: true
        });
    } else {
        next()
    }
})

export default router
