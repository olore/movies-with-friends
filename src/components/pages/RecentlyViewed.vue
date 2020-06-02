<template>
  <v-container class="">
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <Search />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="headline">Recently Viewed</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="6" sm="4" v-for="movie in movies" :key="movie.imdbID">
        <Card :movie="movie" tile class="ma-1 pa-1" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "../Card";
import Movie from "../../models/Movie";
import Search from "../Search";

export default {
  name: "RecentlyViewed",
  components: {
    Card,
    Search,
  },
  created: async function () {
    this.movies = await Movie.getRecentlyViewed();
  },
  data: () => ({
    movies: [],
  }),
};
</script>
