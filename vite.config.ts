import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {nodePolyfills} from 'vite-plugin-node-polyfills';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(), nodePolyfills()],
  build: {
    outDir: './docs',
  },
  base: '/gift-top-up/',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
