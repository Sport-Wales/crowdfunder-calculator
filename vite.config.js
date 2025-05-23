import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    host: true // Add this to allow external connections
  },
  preview: {
    port: process.env.PORT || 3000,
    host: true // Add this to allow external connections
  }
})