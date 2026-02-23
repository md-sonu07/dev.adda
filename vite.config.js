import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tiptap')) return 'vendor-editor';
            if (id.includes('recharts')) return 'vendor-charts';
            if (id.includes('framer-motion')) return 'vendor-animations';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('axios')) return 'vendor-api';
            if (id.match(/[\\/]react(?:-dom)?[\\/]/)) return 'vendor-react';

            // let Vite handle the rest automatically, or put them in a generic vendor chunk
            return 'vendor';
          }
        }
      },
    },
  },
})
