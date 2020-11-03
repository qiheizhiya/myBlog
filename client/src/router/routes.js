export default [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/Home"),
    meta: {
      title: '漆黑之牙'
    }
  },
  {
    path: "/exhibit",
    name: "Exhibit",
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/Exhibit"),
    meta: {
      title: '展览 | 漆黑之牙'
    }
  },
  {
    path: "/articleList",
    name: "ArticleList",
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/ArticleList"),
    meta: {
      title: 'Article | 漆黑之牙'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/ArticleList/detail"),
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/Demo"),
    meta: {
      title: 'Demo | 漆黑之牙'
    }
  },
  {
    path: "/self",
    name: "Self",
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/SelfInfo")
  },
  {
    path: "/message",
    name: "Message",
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/MessageBoard")
  },
  {
    path: "/rainy",
    name: "Rainy",
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/Rainy")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "chunk-all" */ "../views/Login")
  },
]