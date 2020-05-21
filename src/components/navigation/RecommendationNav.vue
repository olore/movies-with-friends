<template>
  <v-list dense>
    <v-list-item link v-on:click="navTo('/recommendations')">
      <v-list-item-action>
        <v-icon>{{ iconStar }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Recommendations</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="onRecommendationPage()">
      <v-list-item-group v-model="settings" multiple style="width: 100%;">
        <RecommendationNavItem name="Joseph O" />
        <RecommendationNavItem name="Grace O" />
        <RecommendationNavItem name="Dana O" />
        <RecommendationNavItem name="Brian O" />
      </v-list-item-group>
    </v-list-item>
  </v-list>
</template>
<script>
import { mdiStar } from "@mdi/js";
import RecommendationNavItem from "./RecommendationNavItem";

export default {
  name: "RecommendationNav",
  props: {
    source: String,
  },
  components: {
    RecommendationNavItem,
  },
  data: () => ({
    drawer: null,
    iconStar: mdiStar,
    settings: [],
  }),
  methods: {
    onRecommendationPage: function () {
      return this.$route.path == "/recommendations";
    },
    navTo: function (path) {
      if (path !== this.$route.path) {
        this.$router.push(path);
      }
    },
  },
};
</script>
