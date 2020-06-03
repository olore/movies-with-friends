<template>
  <v-container class="">
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <Search />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="headline">My Rated</span>
        <v-btn @click="sort('date')" small :color="color('date')" class="ml-4">
          By Date
        </v-btn>
        <v-btn
          @click="sort('rating')"
          small
          :color="color('rating')"
          class="ml-4"
        >
          By Rating
        </v-btn>
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
  name: "RecentlyRated",
  components: {
    Card,
    Search,
  },
  created: async function () {
    this.movies = await Movie.getMyRated();
  },
  data: () => ({
    sortOrder: "date",
    movies: [],
  }),
  methods: {
    sort: async function (sortBy) {
      this.movies = await Movie.getMyRated(sortBy);
      this.sortOrder = sortBy;
    },
    color: function (sortBy) {
      return this.sortOrder === sortBy ? "secondary" : "primary";
    },
  },
};
</script>
