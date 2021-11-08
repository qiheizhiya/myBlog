import Vue from "vue";
import App from "./App.vue";
import router from "./router/power";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入 iconfont
import '@/assets/font/iconfont.css';
// 引入 iconfont

// 引入markDown 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/index.css'
Vue.use(mavonEditor)

Vue.use(ElementUI)

Vue.prototype.mainUrl = process.env.VUE_APP_URL

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
  Vue.config.productionTip = false
}