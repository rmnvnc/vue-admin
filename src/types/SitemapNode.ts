export interface SitemapNode {
    ID: number
    ID_entity: number
    name: string
    items?: SitemapNode[]
}