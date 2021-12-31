<template>
  <v-app id="olore">
    <div v-if="$route.path != '/'">
      <AppWrapper />
    </div>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app class="justify-end">
      <span>&copy; 2020-2099 - Brian Olore - brian@olore.net</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppWrapper from "./AppWrapper";

export default {
  name: "App",
  components: { AppWrapper },
};
</script>
