<template>
  <v-card class="mx-auto" max-width="300">
    <v-img
      class="white--text align-end"
      height="200px"
      alt="movie poster"
      position="center top"
      :src="movie.Poster"
    >
      <v-card-title></v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{ movie.Title }}</v-card-subtitle>

    <v-card-text class="text--primary">
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
        ></RottenTomatoesRating>
      </div>

      <div>
        {{ movie.Plot }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
        target="_blank"
        :href="movie.getReelGoodLink()"
      >
        Where to watch?
      </v-btn>

      <v-btn color="orange" text>
        Seen this?
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
};
</script>
