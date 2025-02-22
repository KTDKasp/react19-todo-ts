import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), TanStackRouterVite({ autoCodeSplitting: true })],
  resolve: {
    alias: {
      src: '/src'
    },
  },
});
