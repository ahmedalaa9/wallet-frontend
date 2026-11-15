import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

/** Where the wallet backend runs. Override with `BACKEND_URL=http://localhost:4100 npm run dev`. */
const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:4000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // The app calls same-origin `/api/*` and `/ws`; Vite forwards them to the backend.
    proxy: {
      '/api': backendUrl,
      '/ws': { target: backendUrl.replace(/^http/, 'ws'), ws: true },
    },
  },
})
