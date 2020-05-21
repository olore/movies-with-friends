<template>
  <v-app id="olore">
    <Navigation v-model="drawer" />

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Movies with Friends</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app class="justify-end">
      <span>&copy; 2020 - Brian Olore - brian@olore.net</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "./components/navigation/Navigation";

export default {
  components: { Navigation },
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
