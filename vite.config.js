import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    base: './',  // This is supposed to make it work with relative paths
    assetsDir: './assets', // Adding this to ensure assets are loaded from a relative directory
  }
})
