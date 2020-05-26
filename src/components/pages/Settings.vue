<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="headline">Settings</span>
      </v-col>
    </v-row>
    <v-row>
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
