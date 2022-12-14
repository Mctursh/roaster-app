import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ScheduleView from "../views/ScheduleView.vue";
import LoginView from "../views/LoginView.vue";
import RequestsView from "../views/RequestsView.vue";
import StaffView from "../views/StaffView.vue"
import store from "../store/index"

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/schedule",
    name: "schedule",
    component: ScheduleView,
  },
  {
    path: "/request",
    name: "request",
    component: RequestsView,
  },
  {
    path: "/staff",
    name: "staff",
    component: StaffView,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.getters.loginState) {
    if (to.path === '/login') next('/dashboard')
    else next();
  } else {
    if (to.path === '/login') next()
    else next('/login');
  }
});

export default router;
