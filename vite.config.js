import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    manualChunks(id) {
      if (id.includes('node_modules')) {

        if (id.includes('@tiptap')) {
          return 'vendor-editor';
        }

        if (id.includes('recharts')) {
          return 'vendor-charts';
        }

        if (id.includes('framer-motion')) {
          return 'vendor-animations';
        }

        if (id.includes('lucide-react') || id.includes('react-icons')) {
          return 'vendor-icons';
        }

        if (id.includes('react-router')) {
          return 'vendor-router';
        }

        if (id.includes('axios')) {
          return 'vendor-api';
        }

        return 'vendor'; 
      }
    }
  },
})
