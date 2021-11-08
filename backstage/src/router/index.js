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
    component: () => import(/* webpackChunkName: "login" */ "../views/Login/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    redirect: 'index',
    meta: {
      name: '主页',
      icon: 'el-icon-s-home'
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import(/* webpackChunkName: "home" */ "../views/Work")
      }
    ]
  },
  {
    path: "/article",
    name: "Article",
    redirect: 'addArt',
    meta: {
      name: '发布文章',
      icon: 'el-icon-position'
    },
    component: Layout,
    children: [
      {
        path: "/addArt",
        name: "AddArt",
        component: () => import( /* webpackChunkName: "article" */"../views/AddArt")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    redirect: 'aboutMe',
    meta: {
      name: '关于我',
      icon: 'el-icon-watermelon'
    },
    component: Layout,
    children: [
      {
        path: "/aboutMe",
        name: "aboutMe",
        component: () => import(/* webpackChunkName: "about" */"../views/AboutMe")
      }
    ]
  },
  {
    path: "/comment",
    name: "Comment",
    redirect: 'commentList',
    meta: {
      name: '评论列表',
      icon: 'el-icon-chat-dot-square'
    },
    component: Layout,
    children: [
      {
        path: "/commentList",
        name: "CommentList",
        component: () => import(/* webpackChunkName: "comment" */ "../views/Comment")
      }
    ]
  },
  {
    path: "/set",
    name: "Set",
    redirect: 'setting',
    meta: {
      name: '设置',
      icon: 'el-icon-setting'
    },
    component: Layout,
    children: [
      {
        path: "/setting",
        name: "Setting",
        component: () => import(/* webpackChunkName: "set" */"../views/Setting")
      }
    ]
  },
];

let base = ''
process.env.NODE_ENV === 'production' ? base = '/back/' : base = ''

const router = new VueRouter({
  mode: 'hash',
  base,
  routes
});


export default router;
