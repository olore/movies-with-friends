<template>
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
      <v-list-item link v-on:click="navTo('/invite')">
        <v-list-item-action>
          <v-icon>{{ iconInvite }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-title>Invite</v-list-item-title>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <RecommendationNav />
  </v-navigation-drawer>
</template>

<script>
import { mdiViewDashboard, mdiCog, mdiAccountMultiplePlus } from "@mdi/js";
import RecommendationNav from "./RecommendationNav";

export default {
  name: "Navigation",
  components: {
    RecommendationNav,
  },
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
    iconDashboard: mdiViewDashboard,
    iconSettings: mdiCog,
    iconInvite: mdiAccountMultiplePlus,
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
