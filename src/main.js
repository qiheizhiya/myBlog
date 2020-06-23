import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局less
import '@/style/normalize.less';
// 引入 iconfont
import '@/assets/font/iconfont.css';
// 引入 flexible
// import '@/assets/js/flexible.js'
Vue.use(ElementUI)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
