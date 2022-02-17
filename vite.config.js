import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000/',
      '/images': 'http://localhost:4000/',
      '/socket.io': {
        target: 'ws://localhost:4000',
        ws: true,
      },
    },
    host: true,
  },
});
