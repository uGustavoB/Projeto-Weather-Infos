import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['/js/weather.js', '/js/favorites.js', '/js/weather.js'],
    },
    outDir: 'docs',
  },
});