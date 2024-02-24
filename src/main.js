import { createApp } from "vue";
import { createPinia } from 'pinia';

// 套件
import ViewUIPlus from "view-ui-plus";
import "view-ui-plus/dist/styles/viewuiplus.css";
import "./assets/sass/base/overwrite.less";

// 引入主程式
import App from "./App.vue";
import router from "./router";

// 創建一個 vue 應用程式(主要配置在 app.vue裡)
const vueApp = createApp(App);

// vueApp.use(router);
vueApp.use(createPinia());
vueApp.use(router)
vueApp.use(ViewUIPlus)
vueApp.mount("#app");
// const app = createApp(App);
// createApp(App).use(router).use(ViewUIPlus).mount("#app");