import { apiRoutes } from '@/constants/apiRoutes'
import { apiClient } from './apiClient'
import { SitemapNode } from '@/types/SitemapNode'

export const getSitemap = async () => {
    return apiClient<SitemapNode[]>(apiRoutes.sitemap.list)
}