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

    <v-card-text
      class="text--primary d-none d-sm-block pb-1"
      style="min-height: 80px"
    >
      <div
        class="d-inline-flex align-self-stretch justify-center"
        style="width: 100%"
      >
        <IMDBRating :movie="movie" class="mr-3"></IMDBRating>
        <RottenTomatoesRating
          v-if="movie.hasRottenTomatoesRating()"
          :rating="movie.getRottenTomatoesRating()"
          :title="movie.Title"
          :imdbid="movie.imdbID"
        ></RottenTomatoesRating>
      </div>
      <span v-if="state.user">
        <v-btn
          :to="{ name: 'circle-movies', params: { id: circle._id } }"
          v-for="circle in movie.likerCircles"
          v-bind:key="circle._id"
          class="ma-2 green darken-4"
          text
          :rounded="true"
          x-small
        >
          {{ circle.name }}
        </v-btn>
      </span>
    </v-card-text>
  </v-card>
</template>
<script>
import IMDBRating from "./ratings/IMDBRating";
import RottenTomatoesRating from "./ratings/RottenTomatoesRating";
import { store } from "../store";

export default {
  name: "Card",
  props: ["movie"],
  components: {
    IMDBRating,
    RottenTomatoesRating,
  },
  data: () => ({
    state: store.state,
  }),
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
