import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // In development, /api calls go to the local Express server.
    proxy: {
      '/api': { target: 'http://127.0.0.1:5001', changeOrigin: true },
    },
  },
});
