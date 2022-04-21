import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import pkg from './package.json';

const path = require('path')

// On reprend le nom du module à partir de package.json :
const name = pkg.name;

// On reprend toutes les dépendances à externaliser de package.json :
const external = Object.keys({...pkg.dependencies, ...pkg.peerDependencies} || {});

export default defineConfig({
    base: '',
    server: {
        port: 8080
    },
    plugins: [
        vue(),
        dts({
            logDiagnostics: true,
            include: ['lib/**/*', 'lib/components/*'],
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            name,
            formats: ['es'],
            fileName: (format) => name + `.${format}.js`,
        },
        rollupOptions: {
            external,
            output: {}
        }
    }
})
