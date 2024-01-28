import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import App from './App.vue'
import router from './router'
// import 'font-awesome/css/font-awesome.min.css';
// import store from './store'
const app = createApp(App)
createApp(App).use(router).use(ViewUIPlus).mount('#app')