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
    path: "/home",
    name: "Home",
    redirect: 'index',
    meta: {
      name: '主页',
      icon: 'icon-tiyu'
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/Work")
      }
    ]
  },
  {
    path: "/article",
    name: "Article",
    redirect: 'addArt',
    meta: {
      name: '发布文章',
      icon: 'icon-tiyu'
    },
    component: Layout,
    children: [
      {
        path: "/addArt",
        name: "AddArt",
        component: () => import("../views/AddArt")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    redirect: 'aboutMe',
    meta: {
      name: '关于我',
      icon: 'icon-tiyu'
    },
    component: Layout,
    children: [
      {
        path: "/aboutMe",
        name: "aboutMe",
        component: () => import("../views/AboutMe")
      }
    ]
  },
  {
    path: "/comment",
    name: "Comment",
    redirect: 'commentList',
    meta: {
      name: '评论列表',
      icon: 'icon-tiyu'
    },
    component: Layout,
    children: [
      {
        path: "/commentList",
        name: "CommentList",
        component: () => import("../views/Comment")
      }
    ]
  },
  {
    path: "/set",
    name: "Set",
    redirect: 'setting',
    meta: {
      name: '设置',
      icon: 'icon-tiyu'
    },
    component: Layout,
    children: [
      {
        path: "/setting",
        name: "Setting",
        component: () => import("../views/Setting")
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
