import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Permet de supporter process.env.API_KEY sans faire planter le build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});