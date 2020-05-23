<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="green lighten-2" class="text-align-left" v-on="on">
        I've seen this
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline" primary-title>
        What did you think?
      </v-card-title>

      <v-card-text class="d-flex flex-column justify-center">
        <v-rating
          v-model="rating"
          size="52"
          class="mb-3 d-flex flex-row justify-center"
        ></v-rating>
        <v-textarea
          label="Optionally leave a comment..."
          name="ratingText"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      rating: 3,
    };
  },
};
</script>
