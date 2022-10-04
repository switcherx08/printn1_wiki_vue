// https://vitejs.dev/config/
import {fileURLToPath, URL} from 'url'
import {defineConfig, loadEnv} from 'vite'
const { resolve } = require('path')
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    const apiDomain = process.env.VITE_API_DOMAIN

    return defineConfig({
        plugins: [vue()],

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },

        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html')
                }
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
                },
            }
        }

    })
}
