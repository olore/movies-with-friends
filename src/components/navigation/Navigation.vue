<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
      <v-list-item link v-on:click="navTo('/recently-rated')">
        <v-list-item-action>
          <v-icon>{{ iconDashboard }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Recently Rated</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link v-on:click="navTo('/recently-viewed')">
        <v-list-item-action>
          <v-icon>{{ iconMovie }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Recently Viewed</v-list-item-title>
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
      <v-list-item link v-on:click="navTo('/my-rated')" v-if="state.user">
        <v-list-item-action>
          <v-icon>{{ iconStar }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-title>My Rated</v-list-item-title>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link v-on:click="navTo('/circles')" v-if="state.user">
        <v-list-item-action>
          <v-icon>{{ iconCircles }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-title>My Circles</v-list-item-title>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link v-on:click="navTo('/')">
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiViewDashboard,
  mdiHome,
  mdiCog,
  mdiStar,
  mdiCircleDouble,
  mdiGoogleCirclesExtended,
  mdiAccountMultiplePlus,
  mdiMovieOpen,
} from "@mdi/js";
import { store } from "../../store";

export default {
  name: "Navigation",
  props: ["value"],

  computed: {
    drawer: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },

  data: () => ({
    iconDashboard: mdiHome,
    iconSettings: mdiCog,
    iconInvite: mdiAccountMultiplePlus,
    iconStar: mdiStar,
    iconMovie: mdiMovieOpen,
    iconCircles: mdiGoogleCirclesExtended,
    state: store.state,
  }),

  methods: {
    navTo: function (path) {
      if (path !== this.$route.path) {
        this.$router.push(path);
      }
    },
  },
};
</script>
