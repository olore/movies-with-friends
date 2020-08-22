<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3>MovieRex</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1>Your Friends. Your Family. Movies. Television.</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn class="primary" x-large to="/recently-rated"
          >Launch MovieRex</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-start">
        <div class="mt-6">
          <div class="font-weight-black">
            See recently viewed and rated movies!
          </div>

          <v-img
            max-width="300"
            v-if="$vuetify.breakpoint.smAndDown"
            src="movie-list-small.png"
          />
          <v-img
            max-width="800"
            v-if="$vuetify.breakpoint.mdAndUp"
            src="movie-list.png"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <div class="mt-6">
          <div class="font-weight-black">
            See what other people in your circles think about a movie!
          </div>
          <v-img
            max-width="200"
            v-if="$vuetify.breakpoint.smAndDown"
            src="terminator-review-small.png"
          />
          <v-img
            v-if="$vuetify.breakpoint.mdAndUp"
            max-width="800"
            src="terminator-review.png"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Splash",
  data: function () {
    return {};
  },
};
</script>
