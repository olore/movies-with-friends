<template>
  <v-app id="olore">
    <Navigation v-model="drawer" />

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Movies with Friends</v-toolbar-title>
      <button
        v-if="!state.googleToken"
        v-google-signin-button="clientId"
        class="google-signin-button"
      >
        Continue with Google
      </button>
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

export default {
  components: { Navigation },
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    clientId: "363023621937-9pdn9513cpmopcbtv7ebmhe8kokpo6s4",
    state: store.state,
  }),

  methods: {
    OnGoogleAuthSuccess(googleUser) {
      let profile = googleUser.getBasicProfile();
      if (profile) {
        console.log(profile.getName());
        console.log(profile.getEmail());
        console.log("id_token", googleUser.getAuthResponse().id_token);
        store.set(googleUser.getAuthResponse().id_token);
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
<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
