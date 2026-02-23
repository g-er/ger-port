import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// IMPORTANT: Replace 'your-username' with your actual PostVisible username
// For local development, set to '/'
// For production on PostVisible, set to '/portfolios/your-username/'
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
