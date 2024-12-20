import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  base: '/governance-experiment/',
  plugins: [svelte()],
  define: {
    'process.env': process.env,
  },
})
