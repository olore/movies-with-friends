<template>
  <v-app id="olore">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link v-on:click="navTo('/')">
          <v-list-item-action>
            <v-icon>{{ iconDashboard }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-on:click="navTo('/settings')">
          <v-list-item-action>
            <v-icon>{{ iconSettings }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Movies with Friends</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2020 - Brian Olore - brian@olore.net</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiViewDashboard, mdiCog } from "@mdi/js";

export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    iconDashboard: mdiViewDashboard,
    iconSettings: mdiCog,
  }),
  methods: {
    navTo: function (componentName) {
      this.$router.push(componentName);
    },
  },
};
</script>
