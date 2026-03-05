import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/oraculo-personajes/',  // ← debe coincidir con el nombre de tu repositorio
})
