export default [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home")
  },
  {
    path: "/exhibit",
    name: "Exhibit",
    component: () => import("../views/Exhibit") 
  },
  {
    path: "/articleList",
    name: "ArticleList",
    component: () => import("../views/ArticleList")
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import("../views/ArticleList/detail"),
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