export default [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "main" */ "../views/Home"),
    meta: {
      title: '漆黑之牙'
    }
  },
  {
    path: "/exhibit",
    name: "Exhibit",
    component: () => import(/* webpackChunkName: "exhibit" */ "../views/Exhibit"),
    meta: {
      title: '展览 | 漆黑之牙'
    }
  },
  {
    path: "/articleList",
    name: "ArticleList",
    component: () => import(/* webpackChunkName: "article" */ "../views/ArticleList"),
    meta: {
      title: 'Article | 漆黑之牙'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "article" */ "../views/ArticleList/detail"),
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import(/* webpackChunkName: "other" */ "../views/Demo"),
    meta: {
      title: 'Demo | 漆黑之牙'
    }
  },
  {
    path: "/self",
    name: "Self",
    component: () => import(/* webpackChunkName: "other" */ "../views/SelfInfo")
  },
  {
    path: "/message",
    name: "Message",
    component: () => import(/* webpackChunkName: "article" */ "../views/MessageBoard")
  },
  {
    path: "/rainy",
    name: "Rainy",
    component: () => import(/* webpackChunkName: "rainy" */ "../views/Rainy")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "other" */ "../views/Login")
  },
]