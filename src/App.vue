<script setup>
import TheHeader from './components/layout/TheHeader.vue'
import { RouterView } from 'vue-router'
import SitemapTree from '@/components/sitemap/SitemapTree.vue'
</script>

<template>
    <the-header/>
    <sitemap-tree/>
    <RouterView />
</template>

<style scoped>
</style>
