import { SitemapNode } from '@/types/SitemapNode'
import { SitemapService } from '@/services/sitemapService'
import { AppError } from '@/types/AppError'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const sitemapService = new SitemapService()

export const useSitemapStore = defineStore('sitemap', () => {
    const tree = ref<SitemapNode[]>([])
    const error = ref<AppError | null>(null)
    const loading = ref(false)

    async function fetchSitemap() {
        loading.value = true
        try {
            const data = await sitemapService.fetch()
            tree.value = data
            console.log(data)
        } catch (err: any) {
            error.value = err as AppError
            tree.value = []
            console.log(error)
        } finally {
            loading.value = false
        }
        
    }

    return {
        tree,
        fetchSitemap,
        loading,
        error
    }
})