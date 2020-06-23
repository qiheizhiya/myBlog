import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局less
import '@/style/normalize.less';
// 引入 iconfont
import '@/assets/font/iconfont.css';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
