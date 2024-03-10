import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import del from 'rollup-plugin-delete';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      plugins: [del({ targets: 'dist/*' })],
    },
  },
});
