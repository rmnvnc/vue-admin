<template>
    <nav>
        <span v-if="loading">Loading sitemap . . .</span>
        <span v-else-if="error">{{ error?.message }}</span>
        <template v-else>
            <ul>
                <SitemapNode v-for="node in nodes" :key="node.ID" :node="node"/>
            </ul>
            <span v-if="!nodes.length">Žiadne položky</span>
        </template>
    </nav>
</template>

<script setup lang="ts">
import SitemapNode from '@/components/sitemap/SitemapNode.vue'
import { onMounted, ref } from 'vue';
import { SitemapService } from '@/services/sitemapService'
import type { SitemapNode as SitemapNodeT, AppError } from '@/types';

const sitemapService = new SitemapService()

const nodes = ref<SitemapNodeT[]>([])
const loading = ref(false)
const error = ref<AppError | null>(null)

async function fetchSitemap() {
    loading.value = true
    try {
        nodes.value = await sitemapService.fetch()
    } catch (err: unknown) {
        error.value = err as AppError
        nodes.value = []
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSitemap()
})

</script>

<style lang="css" scoped></style>
