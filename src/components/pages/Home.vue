<template>
  <v-container class="">
    <v-row>
      <v-col cols="12">
        <Search />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="headline">Recent favorites</span>
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
import { mdiViewDashboard, mdiCog } from "@mdi/js";
import Movie from "../../models/Movie";
import Search from "../Search";

export default {
  name: "Home",
  components: {
    Card,
    Search,
  },
  mounted: async function () {
    this.movies = await Movie.getRecentlyViewed();
    console.log(this.movies);
  },
  data: () => ({
    movies: [],
  }),
};
</script>
