<template>
  <v-container class="">
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <Search />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0">
        <span class="title">My Rated</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0">
        <v-btn
          @click="sort('date')"
          x-small
          color="primary"
          :disabled="sortOrder === 'date'"
          class="ml-4"
        >
          By Date
        </v-btn>
        <v-btn
          @click="sort('rating')"
          x-small
          color="primary"
          :disabled="sortOrder === 'rating'"
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
  },
};
</script>
