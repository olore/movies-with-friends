<template>
  <v-app id="olore">
    <Navigation v-model="drawer" />

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Movies with Friends</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="state.user">
        <v-img height="40" width="40" :src="state.user.image" />
      </div>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
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

    <v-content>
      <router-view v-if="state.user"></router-view>
      <div v-else v-google-signin-button="clientId">
        <v-container :class="{ 'd-none': gaLoading }">
          <span class="headline">Please sign in</span>
          <div id="my-signin2"></div>
        </v-container>
      </div>
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
import User from "./models/User";

export default {
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
      iconStar: mdiStar,
    };
  },
  methods: {
    OnGoogleAuthInitError(err) {
      console.error("ga init error", googleUser);
    },
    OnGoogleAuthInit() {
      this.gaLoading = false;
    },
    OnGoogleAuthSuccess(googleUser) {
      let profile = googleUser.getBasicProfile();
      if (profile) {
        store.set(
          "user",
          new User({
            googleToken: googleUser.getAuthResponse().id_token,
            givenName: profile.getGivenName(),
            image: profile.getImageUrl(),
            name: profile.getName(),
            email: profile.getEmail(),
          })
        );
      } else {
        console.log("Not sure why there is no profile");
      }
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
  },
};
</script>
