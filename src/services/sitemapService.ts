import { getSitemap } from '@/api/sitemapApi'
import type { SitemapNode } from '@/types/SitemapNode'
import { AppError } from '@/types/AppError'

export class SitemapService {
    async fetch(): Promise<SitemapNode[]> {
        const response = await getSitemap()
        
        return response.data
    }
}