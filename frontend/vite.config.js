import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5500/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        base: "/project_tekweb-_uas_2024",
      },
    },
  },
});

