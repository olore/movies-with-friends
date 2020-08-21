<template>
  <div>
    <div v-if="state.user">
      <Navigation v-model="drawer" />

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon
          aria-label="Navigation"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>MovieRex</v-toolbar-title>

        <v-spacer></v-spacer>

        <div>
          <v-img height="40" width="40" :src="state.user.image" />
        </div>

        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" aria-label="Sub-Menu">
              <v-icon>{{ iconDots }}</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-if="state.user" :to="{ name: 'settings' }">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
  </div>
</template>
<script>
import Navigation from "./components/navigation/Navigation";
import { store } from "./store";
import { mdiDotsVertical } from "@mdi/js";
import User from "./models/User";

export default {
  name: "AppWrapper",
  components: { Navigation },
  props: {
    source: String,
  },
  data: function () {
    return {
      drawer: null,
      clientId: "363023621937-9pdn9513cpmopcbtv7ebmhe8kokpo6s4",
      gaLoading: true,
      state: store.state,
      iconDots: mdiDotsVertical,
    };
  },
};
</script>
