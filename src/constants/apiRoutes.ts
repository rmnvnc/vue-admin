const BASE_API = '/admin/rest/service'

export const apiRoutes = {
    me: `${BASE_API}/me`,
    auth: `${BASE_API}/authenticate`,
    logout: `${BASE_API}/logout`,
    sitemap: {
        list: `${BASE_API}/page_tree`
    }
    // articles: {
    //     list: `${BASE}/articles`,
    //     byId: (id: string) => `${BASE}/articles/${id}`
    // }
}