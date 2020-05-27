<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" class="text-align-left" v-on="on">
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
          v-model="comment"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :loading="isLoading" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Movie from "../models/Movie";

export default {
  data() {
    return {
      dialog: false,
      rating: 3,
      comment: "",
      error: null,
      isLoading: false,
    };
  },
  props: ["imdbID"],
  methods: {
    save: async function () {
      this.isLoading = true;
      try {
        let res = await Movie.like({
          comment: this.comment,
          rating: this.rating,
          imdbID: this.imdbID,
        });
        if (res) {
          this.dialog = false; // close dialog
        } else {
          console.error(err);
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
