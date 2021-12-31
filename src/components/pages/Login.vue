<template>
  <div>
    <div v-if="!state.user" v-google-signin-button="clientId">
      <v-container :class="{ 'd-none': gaLoading }">
        <h1 class="headline">Please sign in</h1>
        <div id="my-signin2"></div>
      </v-container>
    </div>
  </div>
</template>
<script>
import { store } from "../../store";
import User from "../../models/User";

export default {
  name: "Login",
  components: {},
  mounted: function () {
    this.redirectTo = this.$route.query;
  },
  data: function () {
    return {
      clientId: "363023621937-9pdn9513cpmopcbtv7ebmhe8kokpo6s4",
      gaLoading: true,
      state: store.state,
    };
  },
  methods: {
    OnGoogleAuthInitError(err) {
      console.error("ga init error", googleUser);
    },
    OnGoogleAuthInit() {
      // Give auth time to settle to avoid flashing Login button
      setTimeout(async () => {
        if (!store?.state?.user) {
          this.gaLoading = false;
        }
      }, 100);
    },
    async OnGoogleAuthSuccess(googleUser) {
      let profile = googleUser.getBasicProfile();
      if (profile) {
        let user = new User({
          googleToken: googleUser.getAuthResponse().id_token,
          givenName: profile.getGivenName(),
          image: profile.getImageUrl(),
          name: profile.getName(),
          email: profile.getEmail(),
        });
        user = await user.populate();
        store.set("user", user);
        this.$router.push({ name: "recentlyViewed" });
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
