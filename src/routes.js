import Home from "./components/Home";
import Settings from "./components/Settings";
import VueRouter from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/settings", component: Settings },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

export { router };
