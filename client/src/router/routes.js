export default [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
    meta: {
      title: '漆黑之牙'
    }
  },
  {
    path: "/exhibit",
    name: "Exhibit",
    component: () => import("../views/Exhibit"),
    meta: {
      title: '展览 | 漆黑之牙'
    }
  },
  {
    path: "/articleList",
    name: "ArticleList",
    component: () => import("../views/ArticleList"),
    meta: {
      title: 'Article | 漆黑之牙'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import("../views/ArticleList/detail"),
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import("../views/Demo"),
    meta: {
      title: 'Demo | 漆黑之牙'
    }
  },
  {
    path: "/self",
    name: "Self",
    component: () => import("../views/SelfInfo")
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("../views/MessageBoard")
  },
  {
    path: "/rainy",
    name: "Rainy",
    component: () => import("../views/Rainy")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login")
  },
]