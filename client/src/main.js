import Vue from "vue";

import App from "./App.vue";

import router from "./router";

import store from "./store";

// 引入elementUi
import ElementUI from 'element-ui';

// 引入全局组件Header
import Header from "@c/Header"
Vue.component('Header',Header)

import 'element-ui/lib/theme-chalk/index.css';

// 引入 iconfont
import '@/assets/font/iconfont.css';

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

Vue.use(ElementUI)

import 'github-markdown-css/github-markdown.css'

Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


