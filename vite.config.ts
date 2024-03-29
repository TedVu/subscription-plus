import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import del from 'rollup-plugin-delete';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      plugins: [del({ targets: 'dist/*' })],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
});
