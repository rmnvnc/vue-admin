<template>
    <BaseLayout v-if="auth.isAuthenticated">
        <template #side>
            <SitemapTree/>
        </template>
        <template #content>
            <RouterView/>
        </template>
    </BaseLayout>
    <RouterView v-else/>
</template>

<script setup lang="ts">
import { RouterView} from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import SitemapTree from '@/components/sitemap/SitemapTree.vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
</script>

<style scoped>
</style>
