import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json';

const path = require('path')

// On reprend le nom du module à partir de package.json :
const name = pkg.name;

// On reprend toutes les dépendances à externaliser de package.json :
const external = Object.keys(pkg.dependencies || {});

export default defineConfig({
    base: '',
    server: {
        port: 8080
    },
    plugins: [
        vue(),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            name,
            fileName: (format) => name + `.${format}.js`,
        },
        rollupOptions: {
            external,
            output: {}
        }
    }
})