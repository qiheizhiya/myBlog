import Vue from "vue";
import VueRouter from "vue-router";
import routeArr from "./routes"
Vue.use(VueRouter);

const routes = routeArr

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior () { // 页面刷新后回到顶部
    return { x: 0, y: 0}
  }
});

export default router;
