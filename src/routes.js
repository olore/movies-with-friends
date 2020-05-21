import VueRouter from "vue-router";

import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import Recommendations from "./components/pages/Recommendations";
import Title from "./components/pages/Title";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/settings", name: "settings", component: Settings },
  {
    path: "/recommendations",
    name: "recommendations",
    component: Recommendations,
  },
  { path: "/title/:title", name: "title", component: Title },
];

const router = new VueRouter({
  routes,
});

export { router };
