<template>
    <nav v-if="auth.isAuthenticated">
        <span v-if="sitemap.loading">Loading sitemap . . .</span>
        <span v-else-if="sitemap.error">{{ sitemap.error.message }}</span>
        <SitemapNode v-else-if="sitemap.tree.length" v-for="node in sitemap.tree" :key="node.ID" :node="node" />
    </nav>
</template>

<script setup lang="ts">
import SitemapNode from '@/components/sitemap/SitemapNode.vue'
import { useAuthStore } from '@/stores/authStore';
import { useSitemapStore } from '@/stores/sitemapStore';
import { watch } from 'vue';

const auth = useAuthStore()
const sitemap = useSitemapStore()

watch(
    () => auth.isAuthenticated,
    (isAuth) => {
        if (isAuth) {
            sitemap.fetchSitemap()
        }
    },
    { immediate: true }
)
</script>

<style lang="css" scoped></style>