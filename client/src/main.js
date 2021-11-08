
import Vue from "vue";
if (process.env.NODE_ENV !== 'production') {
  
  import('element-ui').then(ele => {
    Vue.use(ele)
  })
  import('element-ui/lib/theme-chalk/index.css')
  
}

import App from "./App.vue";

import router from "./router/handler";

import store from "./store";


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

// 设置请求域名
let mainUrl = process.env.VUE_APP_URL
Vue.prototype.mainUrl = mainUrl

// 添加百度统计
var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?47c4ba855b7925913cdf701208a1dc0f";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
  Vue.config.productionTip = false
} else {
  Vue.config.devtools = false
  Vue.config.productionTip = false
}