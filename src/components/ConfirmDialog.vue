<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        class="mx-2"
        fab
        small
        :color="color"
        :aria-label="ariaLabel"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">You sure?</v-card-title>
      <v-card-text>{{ question }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-3" text @click="cancel()">Oops, Nope</v-btn>
        <v-btn color="green darken-1" text @click="approve()"
          >Yup, I'm sure</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: ["approve", "ariaLabel", "question", "icon", "color"],
  data: function () {
    return {
      dialog: false,
    };
  },
  methods: {
    cancel: function () {
      this.dialog = false;
    },
  },
};
</script>
