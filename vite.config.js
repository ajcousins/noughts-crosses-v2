import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/noughts-crosses-v2/',
  build: {
    outDir: 'build',
  },
  scripts: {
    predeploy: 'npm run build',
    deploy: 'gh-pages -d build',
  },
});
