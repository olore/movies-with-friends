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
      <v-list-item-group v-model="settings" multiple>
        <v-list-item>
          <template v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                v-model="active"
                color="primary"
                @click="toggle"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Joseph O</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                v-model="active"
                color="primary"
                @click="toggle"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Grace O</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                v-model="active"
                color="primary"
                @click="toggle"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Brian O</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                v-model="active"
                color="primary"
                @click="toggle"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dana O</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list-item>
  </v-list>
</template>
<script>
import { mdiStar } from "@mdi/js";

export default {
  name: "RecommendationNav",
  props: {
    source: String,
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
