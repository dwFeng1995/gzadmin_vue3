import { createApp } from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import installElementPlus from './plugins/element'

import '@/router/permission'
//导入全局样式表
import '@/assets/css/main.scss'

const app = createApp(App)
app.config.warnHandler = () => null

installElementPlus(app)
app.use(store).use(router).mount('#app')


// createApp(App).use(store).use(router).mount("#app");

