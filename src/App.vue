<template>
  <v-app id="olore">
    <Navigation v-model="drawer" />

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Movies with Friends</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="state.user && $vuetify.breakpoint.smAndUp">
        <v-icon>{{ iconStar }}</v-icon>
        {{ state.user.name }}
      </div>

      <div
        v-if="!state.user"
        v-google-signin-button="clientId"
        id="my-signin2"
      ></div>
      <v-menu left bottom v-if="state.user">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>{{ iconDots }}</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="{ name: 'settings' }">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
import { store } from "./store";
import { mdiDotsVertical, mdiStar } from "@mdi/js";

export default {
  components: { Navigation },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    clientId: "363023621937-9pdn9513cpmopcbtv7ebmhe8kokpo6s4",
    state: store.state,
    iconDots: mdiDotsVertical,
    iconStar: mdiStar,
  }),

  methods: {
    OnGoogleAuthSuccess(googleUser) {
      let profile = googleUser.getBasicProfile();
      if (profile) {
        store.set("user", {
          googleToken: googleUser.getAuthResponse().id_token,
          name: profile.getName(),
          email: profile.getEmail(),
        });
      } else {
        console.log("google not logged in, I guess?");
      }
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
  },
};
</script>
