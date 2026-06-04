# vite.config.ts - Optimized Build Configuration

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    
    // Rollup options
    rollupOptions: {
      output: {
        // Code splitting strategy
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'utils': ['axios', 'lodash'],
        },
        // Asset naming for cache busting
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
      },
    },
    
    // Optimize chunks
    chunkSizeWarningLimit: 500,
    
    // CSS code splitting
    cssCodeSplit: true,
  },

  // Dev server
  server: {
    middlewareMode: false,
    hmr: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router', 'axios'],
  },
})
