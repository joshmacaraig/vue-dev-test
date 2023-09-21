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
    base: '/vue-dev-test/', // Update this line to match your GitHub Pages subpath
    assetsDir: 'assets'  // No need for './' here, just the folder name
  }
})
