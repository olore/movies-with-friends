import VueRouter from "vue-router";

import Home from "./components/Home";
import Settings from "./components/Settings";
import Recommendations from "./components/Recommendations";

const routes = [
  { path: "/", component: Home },
  { path: "/settings", component: Settings },
  { path: "/recommendations", component: Recommendations },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

export { router };
