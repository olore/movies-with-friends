<template>
  <v-container>
    <v-row class="my-0">
      <v-col cols="12">
        <h1 class="headline">Settings</h1>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12">
        <v-btn v-on:click="switchTheme">Switch theme</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  methods: {
    switchTheme: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
