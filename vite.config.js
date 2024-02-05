import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.DEPLOY_TARGET === "GITHUB_PAGES"
      ? "/NORA-BackStage/" // 替換為你的 GitHub 倉庫名
      : process.env.NODE_ENV === "production"
        ? "/chd104/g1/back/"
        : "/",
  build: {
    outDir: "back",
  },
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar.php -> https://tibamef2e.com/cgd103/g1/api/bar.php
      "/api": {
        target: "http://localhost/NORAapi",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {
        additionalData: `
        @import "./src/assets/sass/main.scss";
				`,
      },
    },
  },
});
