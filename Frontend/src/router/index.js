import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import adopt from "../components/adopt/adoptAnimals";
import adoptDetails from "../components/adopt/adoptDetails";
import login from "../components/login";
import register from "../components/register";
import createAnimal from "../components/createAnimal";
import userProfile from "../components/userProfile";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/adopt",
    name: "adopt",
    component: adopt,
  },
  { path: "/adopt/:id", name: "adoptDetails", component: adoptDetails },
  { path: "/login", name: "login", component: login },
  { path: "/register", name: "register", component: register },
  {
    path: "/user/:id",
    name: "userProfile",
    component: userProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    name: "createAnimal",
    component: createAnimal,
    meta: { requiresAuth: true },
  },
  // { path: "/edit", name: "register", component: register },
  // { path: "/register", name: "register", component: register },
  // { path: "/register", name: "register", component: register },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
const isAuthenticated = router.app.$store.getters.isAuthenticated;
// console.log(isAuthenticated);

if (requiresAuth && !isAuthenticated) next({ name: "login" });
// if (isAuthenticated) next({ name: "createAnimal" });
else next();
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const isAuthenticated = router.app.$store.getters.isAuthenticated;
//   if (requiresAuth && !isAuthenticated) next({ name: "login" });
//   else if (!requiresAuth && isAuthenticated) next({ name: "createAnimal" });
//   else next();
// });

export default router;
