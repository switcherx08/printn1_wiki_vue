import {fileURLToPath, URL} from 'url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const apiDomain = 'https://1044631-cr49176.tmweb.ru/'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    server: {
        proxy: {
            '/api': {
                target: `${apiDomain}/api`, // your-remote-domain.com
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            '/sanctum': {
                target: `${apiDomain}/sanctum`, // your-remote-domain.com
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/sanctum/, ""),
            }
        }
    }

})
