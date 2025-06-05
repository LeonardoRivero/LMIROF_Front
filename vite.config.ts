import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/LMIROF_Front/',
  plugins: [react({
    babel: {
      plugins: []
    }
  })],
  build: {
    outDir: 'dist', // o 'build' si así lo prefieres
    minify: 'esbuild',
  }
})
