import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { layout: "PageLayout" },
  },
];

const router = new VueRouter({
  mode: process.env.NODE_ENV === "production" ? "history" : "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
