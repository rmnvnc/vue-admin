<script setup>
import { RouterView, useRoute } from 'vue-router'
import BaseLayout from './layouts/BaseLayout.vue'
import SitemapTree from '@/components/sitemap/SitemapTree.vue'

const route = useRoute()
</script>

<template>
    <RouterView v-if="route.name === 'login'"/>
    <BaseLayout v-else>
        <template #side>
            <sitemap-tree />
        </template>
        <template #content>
            <RouterView />
        </template>
    </BaseLayout>
</template>

<style scoped>
</style>
