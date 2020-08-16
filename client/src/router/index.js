import Vue from "vue";
import VueRouter from "vue-router";
import routeArr from "./routes"
Vue.use(VueRouter);

const routes = routeArr

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
