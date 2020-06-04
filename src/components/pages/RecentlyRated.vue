<template>
  <v-container class="">
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <Search />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="headline">Recently Rated</span>
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
import InfiniteScroller from "../../InfiniteScroller";

export default {
  name: "RecentlyRated",
  components: {
    Card,
    Search,
  },
  mounted: async function () {
    const PAGE_SIZE = 6;
    let { movies, totalCount } = await Movie.getRecentlyRated(this.PAGE_SIZE);
    this.movies = movies;

    this.setupInfiniteScroll(PAGE_SIZE, totalCount);
  },
  data: () => ({
    movies: [],
  }),
  methods: {
    setupInfiniteScroll: function (pageSize, totalCount) {
      new InfiniteScroller({
        pageSize,
        totalCount,
      }).onScrollBottom(async (pageSize, offset) => {
        this.movies.push(
          ...(await Movie.getRecentlyRated(pageSize, offset)).movies
        );
      });
    },
  },
};
</script>
