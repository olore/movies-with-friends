import VueRouter from "vue-router";

import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import MyCircles from "./components/pages/MyCircles";
import JoinCircle from "./components/pages/JoinCircle";
import Title from "./components/pages/Title";
import Invite from "./components/pages/Invite";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/invite", name: "invite", component: Invite },
  { path: "/settings", name: "settings", component: Settings },
  {
    path: "/circles/:id/join",
    name: "joinCircle",
    component: JoinCircle,
  },
  {
    path: "/circles",
    name: "circles",
    component: MyCircles,
  },
  { path: "/title/:id", name: "title", component: Title },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export { router };
