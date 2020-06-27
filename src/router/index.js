import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Time",
    component: () => import(/* webpackChunkName: "time" */ "../views/Time.vue")
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/Calendar.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
