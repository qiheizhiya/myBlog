import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: 'login',
    hidden: true,
    meta: {
      name: '主页',
      icon: 'icon-zhengli'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登陆",
      icon: 'icon-dili'
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/work",
    name: "Work",
    redirect: 'index',
    meta: {
      name: '主页',
      icon: 'icon-tiyu',
      index: '0'
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: '首页'
        },
        component: () => import("../views/Work")
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
