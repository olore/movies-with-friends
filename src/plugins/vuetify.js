import Vue from "vue";
import Vuetify from "vuetify/lib";
import minifyTheme from "minify-css-string";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  theme: {
    // from https://vuetifyjs.com/en/customization/theme/
    dark: true,
    options: { minifyTheme },
  },
});
