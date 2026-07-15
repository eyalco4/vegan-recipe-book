import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/vegan-recipe-book/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'המטבח שלנו',
        short_name: 'המטבח שלנו',
        description: 'ספר המתכונים הטבעוני המשפחתי שלנו',
        lang: 'he',
        dir: 'rtl',
        theme_color: '#4a7c59',
        background_color: '#faf8f3',
        display: 'standalone',
        start_url: '/vegan-recipe-book/',
        scope: '/vegan-recipe-book/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },
    }),
  ],
})
