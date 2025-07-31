import { getSitemap } from '@/api/sitemapApi'
import type { SitemapNode } from '@/types/SitemapNode'
import { AppError } from '@/types/AppError'

export class SitemapService {
    async fetch(): Promise<SitemapNode[]> {
        const response = await getSitemap()

        if (!response.success) {
            throw new AppError(response.error || 'Nepodarilo sa načítať sitemap', 500, 'SITEMAP_ERROR')
        }
        
        return response.data
    }
}