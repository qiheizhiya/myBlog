import Vue from "vue";
import App from "./App.vue";
import router from "./router/power";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入markDown 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.use(ElementUI)
Vue.prototype.mainUrl = 'http://localhost:5008'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
