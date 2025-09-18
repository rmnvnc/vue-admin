const BASE_API = '/admin/rest/service'

export const apiRoutes = {
    me: `${BASE_API}/me`,
    auth: `${BASE_API}/authenticate`,
    logout: `${BASE_API}/logout`,
    sitemap: {
        list: `${BASE_API}/page_tree`, // GET zoznam
        // byId: (id: string) => `${BASE_API}/page_tree/${id}`, // GET detail
        // create: `${BASE_API}/page_tree`,             // POST
        // update: (id: string) => `${BASE_API}/page_tree/${id}`, // PUT/PATCH
        // delete: (id: string) => `${BASE_API}/page_tree/${id}`  // DELETE
    }
}