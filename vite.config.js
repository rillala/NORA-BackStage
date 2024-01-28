import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.DEPLOY_TARGET === 'GITHUB_PAGES'
      ? '/NORA-BackStage/' // 替換為你的 GitHub 倉庫名
      : process.env.NODE_ENV === 'production'
        ? '/chd104/g1/back/'
        : '/',
  build: {
    outDir: 'back',
  },
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/sass/main.scss";
				`,
      },
    },
  },
});

