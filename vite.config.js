import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Allows smooth deployment on GitHub Pages or custom subpaths
  server: {
    port: 3000,
    host: true
  }
})
