import Vue from "vue";

import App from "./App.vue";

import router from "./router/handler";

import store from "./store";

// 引入elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 引入elementUi

// 引入全局组件Header
import Header from "@c/Header"
Vue.component('Header', Header)
// 引入全局组件Header

// 引入 iconfont
import '@/assets/font/iconfont.css';
// 引入 iconfont

// 高亮富文本
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
// 高亮富文本

// 引入markdown-css
import 'github-markdown-css/github-markdown.css'
// 引入markdown-css

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


