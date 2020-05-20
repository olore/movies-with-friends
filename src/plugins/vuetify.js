import Vue from "vue";
import Vuetify from "vuetify/lib";
import minifyTheme from "minify-css-string";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    // from https://vuetifyjs.com/en/customization/theme/
    dark: true,
    options: { minifyTheme },
  },
});
