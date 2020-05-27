<template>
  <v-card
    class="mx-auto"
    :max-width="cardWidth"
    :to="{ name: 'title', params: { id: movie.imdbID } }"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      alt="movie poster"
      position="center top"
      :src="movie.Poster"
    >
      <v-card-title></v-card-title>
    </v-img>

    <v-card-subtitle
      class="pa-1 text-center font-weight-bold"
      :style="subTitle"
      >{{ movie.Title }}</v-card-subtitle
    >

    <v-card-text class="text--primary d-none d-md-block pb-1">
      <div
        class="d-inline-flex align-self-stretch justify-center"
        style="width: 100%;"
      >
        <IMDBRating
          :rating="movie.imdbRating"
          :imdbid="movie.imdbID"
          class="mr-3"
        ></IMDBRating>
        <RottenTomatoesRating
          v-if="movie.hasRottenTomatoesRating()"
          :rating="movie.getRottenTomatoesRating()"
          :title="movie.Title"
          :imdbid="movie.imdbID"
        ></RottenTomatoesRating>
      </div>

      <div>
        {{ `${movie.Plot.substring(0, 100)}...` }}
      </div>
    </v-card-text>

    <v-card-actions class="d-none d-sm-flex">
      <v-btn
        color="orange"
        class="subtitle-2"
        text
        target="_blank"
        :href="movie.getReelGoodLink()"
      >
        Where to watch?
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import IMDBRating from "./ratings/IMDBRating";
import RottenTomatoesRating from "./ratings/RottenTomatoesRating";

export default {
  name: "Card",
  props: ["movie"],
  components: {
    IMDBRating,
    RottenTomatoesRating,
  },
  computed: {
    subTitle() {
      if (this.$vuetify.breakpoint.xs) {
        return "min-height: 50px; max-height: 50px; overflow: hidden;";
      } else {
        return "max-height: 25px; overflow: hidden";
      }
    },
    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "150px";
        case "sm":
          return "200px";
        default:
          return "300px";
      }
    },
  },
};
</script>
