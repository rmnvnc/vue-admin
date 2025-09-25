import { apiRoutes } from '@/constants/apiRoutes'
import { apiClient } from './apiClient'
import { SitemapNode } from '@/types'

export const getSitemap = async () => {
    return apiClient<SitemapNode[]>(apiRoutes.sitemap.list)
}
