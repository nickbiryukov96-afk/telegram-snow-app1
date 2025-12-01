import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Разрешаем доступ извне
    allowedHosts: [
      '.trycloudflare.com', // Разрешаем все Cloudflare туннели
      '.loca.lt', // Разрешаем localtunnel
      'localhost',
      '127.0.0.1'
    ],
  },
})
