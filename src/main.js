import { createApp } from "vue";

// 套件
import ViewUIPlus from "view-ui-plus";
import "view-ui-plus/dist/styles/viewuiplus.css";
import "./assets/sass/base/overwrite.less";

// 引入主程式
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
createApp(App).use(router).use(ViewUIPlus).mount("#app");
