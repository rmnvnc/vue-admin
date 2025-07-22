import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
    base: '/admin/',
    build: {
        outDir: path.resolve(__dirname, '!www'),
        emptyOutDir: true
    },
    plugins: [
        vue(),
        vueDevTools(),
        viteStaticCopy({
            targets: [
                {
                    src: path.resolve(__dirname, '.htaccess'),
                    dest: '.' // výsledok: !www/.htaccess
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    }
})
