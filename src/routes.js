import VueRouter from "vue-router";

const Home = () => import("./components/pages/Home");
// Lazy loading the rest causes lots of smaller js/css files to be generated
// which seems to make things more laggy than anything when testing on server
//
// const Settings = () => import("./components/pages/Settings");
// const MyCircles = () => import("./components/pages/MyCircles");
// const JoinCircle = () => import("./components/pages/JoinCircle");
// const Title = () => import("./components/pages/Title");

// import Home from "./components/pages/Home";
import RecentlyRated from "./components/pages/RecentlyRated";
import RecentlyViewed from "./components/pages/RecentlyViewed";
import Settings from "./components/pages/Settings";
import MyCircles from "./components/pages/MyCircles";
import JoinCircle from "./components/pages/JoinCircle";
import Title from "./components/pages/Title";
import MyRated from "./components/pages/MyRated";

import { store } from "./store";

const routes = [
  { path: "/", name: "home", component: RecentlyRated },
  {
    path: "/recently-viewed",
    name: "recentlyViewed",
    component: RecentlyViewed,
  },
  { path: "/recently-rated", name: "recentlyRated", component: RecentlyRated },
  { path: "/my-rated", name: "myRated", component: MyRated },
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

router.beforeEach((to, from, next) => {
  // user is put into state by App.vue
  // wait for it to be there before allowing navigcation
  // to any other route
  if (store.state === undefined || store.state.user == undefined) {
    let waitForUserInterval = setInterval(async function () {
      if (store.state && store.state.user) {
        clearInterval(waitForUserInterval);
        next();
      }
    }, 200);
  } else {
    next();
  }
});

export { router };
