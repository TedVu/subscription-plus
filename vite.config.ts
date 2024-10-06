import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import del from "rollup-plugin-delete";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@composables": path.resolve(__dirname, "./src/composables/index.ts"),
      "@components": path.resolve(__dirname, "./src/components/index.ts"),
      "@pages": path.resolve(__dirname, "./src/pages/index.ts"),
      "@routes": path.resolve(__dirname, "./src/routes/index.ts"),
      "@store": path.resolve(__dirname, "./src/store/index.ts"),
      "@types": path.resolve(__dirname, "./src/types/index.ts"),
      "@validation": path.resolve(__dirname, "./src/validation/index.ts"),
    },
  },
  server: {
    port: 8008,
  },
  plugins: [vue(), visualizer(), mkcert()],
  build: {
    target: "esnext",
    rollupOptions: {
      plugins: [del({ targets: "dist/*" })],
      output: {
        chunkFileNames: "vendors/[name]-[hash].js",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
      treeshake: true,
    },
    minify: "terser",
    terserOptions: {
      mangle: true,
      sourceMap: true,
      toplevel: true,
      compress: true,
    },
    assetsDir: "src",
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    sourcemap: "inline",
  },
});
