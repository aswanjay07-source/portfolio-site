import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  server: {
    port: 5173,         // or 5500 if you prefer
    open: true          // 👈 this opens your default browser automatically
  },
  plugins: [react()]
})
