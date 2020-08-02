import Vue from "vue";

import App from "./App.vue";

import router from "./router";

import store from "./store";

// 引入elementUi
import ElementUI from 'element-ui';

import Header from "@c/Header"

import 'element-ui/lib/theme-chalk/index.css';

// 引入 iconfont
import '@/assets/font/iconfont.css';

Vue.use(ElementUI)

import 'github-markdown-css/github-markdown.css'

Vue.config.productionTip = false;

Vue.component('Header',Header)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
