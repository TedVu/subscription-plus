import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import del from "rollup-plugin-delete";
import { splitVendorChunkPlugin } from "vite";
import vuetify from "vite-plugin-vuetify";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [vue(), splitVendorChunkPlugin(), vuetify(), visualizer()],
  build: {
    rollupOptions: {
      input: {
        app: "public/index.html", // default
      },
      plugins: [del({ targets: "dist/*" })],
      output: {
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
    },
  },
});
