import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
    base: '',
    server: {
        port: 8080
    },
    plugins: [
        vue(),
    ]
})