import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
    build: {
      outDir: 'bin', // Change output folder to 'bin'
      chunkSizeWarningLimit: 1000, // for example, increase it to 1MB
    }
  
  
})
