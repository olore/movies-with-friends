import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import { router } from "./routes";
import GoogleSignInButton from "./components/GoogleSigninButton";

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  GoogleSignInButton,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
