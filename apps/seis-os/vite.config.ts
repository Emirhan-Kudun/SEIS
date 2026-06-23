import { defineConfig } from 'vite';

// Relative base so the built OS can be served from any sub-path
// (e.g. /apps/seis-os/dist/) as well as from a domain root.
export default defineConfig({
  base: './',
  build: {
    target: 'es2021',
    outDir: 'dist',
    sourcemap: false,
  },
});
