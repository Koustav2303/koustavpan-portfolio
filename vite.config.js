import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/koustavpan-portfolio/', 
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600, 
  }
})