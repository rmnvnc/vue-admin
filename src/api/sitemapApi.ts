import { apiRoutes } from '@/constants/apiRoutes'
import { apiClient } from './apiClient'

export const getSitemap = async () => {
    return apiClient(apiRoutes.sitemap.list)
}