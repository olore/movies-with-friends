<template>
  <div>
    <Navigation v-model="drawer" />

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon
        aria-label="Navigation"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>MovieRex</v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <v-img
          v-if="state.user"
          height="40"
          width="40"
          :src="state.user.image"
        />
      </div>

      <div v-if="!state.user">
        <v-btn
          class="pa-0 d-inline-flex"
          color="primary"
          :to="{ name: 'Login' }"
        >
          Login
        </v-btn>
      </div>

      <v-menu left bottom v-if="state.user">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" aria-label="Sub-Menu">
            <v-icon>{{ iconDots }}</v-icon>
          </v-btn>
        </template>

        <v-list class="mt-11">
          <v-list-item :to="{ name: 'settings' }">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
import Navigation from "./components/navigation/Navigation";
import { store } from "./store";
import { mdiDotsVertical } from "@mdi/js";

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
