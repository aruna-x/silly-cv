import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // this base is specific to silly-cv, change if necessary
  base: '/silly-cv/',
})
