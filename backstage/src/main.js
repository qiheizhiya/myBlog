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

let mainUrl = ''
process.env.NODE_ENV === 'production' ? mainUrl = 'http://www.llongjie.top:5008' : mainUrl = 'http://localhost:5008'
Vue.prototype.mainUrl = mainUrl

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
