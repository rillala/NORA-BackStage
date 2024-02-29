// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/T14%20Gen%203/Desktop/NORA-BackStage/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/T14%20Gen%203/Desktop/NORA-BackStage/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/T14%20Gen%203/Desktop/NORA-BackStage/vite.config.js";
var vite_config_default = defineConfig({
  base: process.env.DEPLOY_TARGET === "GITHUB_PAGES" ? "/NORA-BackStage/" : process.env.NODE_ENV === "production" ? "/chd104/g1/back/" : "/",
  build: {
    outDir: "back"
  },
  plugins: [vue()],
  server: {
    // post:5174,
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      },
      scss: {
        additionalData: `
        @import "./src/assets/sass/main.scss";
				`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUMTQgR2VuIDNcXFxcRGVza3RvcFxcXFxOT1JBLUJhY2tTdGFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVDE0IEdlbiAzXFxcXERlc2t0b3BcXFxcTk9SQS1CYWNrU3RhZ2VcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1QxNCUyMEdlbiUyMDMvRGVza3RvcC9OT1JBLUJhY2tTdGFnZS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6XHJcbiAgICBwcm9jZXNzLmVudi5ERVBMT1lfVEFSR0VUID09PSBcIkdJVEhVQl9QQUdFU1wiXHJcbiAgICAgID8gXCIvTk9SQS1CYWNrU3RhZ2UvXCIgLy8gXHU2NkZGXHU2M0RCXHU3MEJBXHU0RjYwXHU3Njg0IEdpdEh1YiBcdTUwMDlcdTVFQUJcdTU0MERcclxuICAgICAgOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCJcclxuICAgICAgICA/IFwiL2NoZDEwNC9nMS9iYWNrL1wiXHJcbiAgICAgICAgOiBcIi9cIixcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiBcImJhY2tcIixcclxuICB9LFxyXG4gIHBsdWdpbnM6IFt2dWUoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICAvLyBwb3N0OjUxNzQsXHJcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgbGVzczoge1xyXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcclxuICAgICAgICBAaW1wb3J0IFwiLi9zcmMvYXNzZXRzL3Nhc3MvbWFpbi5zY3NzXCI7XHJcblx0XHRcdFx0YCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVCxTQUFTLGVBQWUsV0FBVztBQUU5VixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFIbUwsSUFBTSwyQ0FBMkM7QUFNcFAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFDRSxRQUFRLElBQUksa0JBQWtCLGlCQUMxQixxQkFDQSxRQUFRLElBQUksYUFBYSxlQUN2QixxQkFDQTtBQUFBLEVBQ1IsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFBQSxFQUNmLFFBQVE7QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLE1BQ0EsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1BR2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
