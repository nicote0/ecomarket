import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Servidor de desarrollo en el puerto 5173.
// El backend Spring Boot corre en http://localhost:8080 (ver src/api/api.js).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
