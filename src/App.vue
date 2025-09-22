<template>
    <RouterView v-if="route.name === 'login'"/>
    <BaseLayout v-else>
        <template #side>
            <SitemapTree/>
        </template>
        <template #content>
            <RouterView/>
        </template>
    </BaseLayout>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import BaseLayout from './layouts/BaseLayout.vue'
import SitemapTree from '@/components/sitemap/SitemapTree.vue'

const route = useRoute()
</script>

<style scoped>
</style>
