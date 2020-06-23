export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login")
  },
  {
    path: "/articleList",
    name: "ArticleList",
    component: () => import("../views/ArticleList")
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import("../views/Demo")
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
    path: "/photos",
    name: "Photos",
    component: () => import("../views/Photos")
  },
]