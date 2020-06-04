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
    <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
      <div slot="no-more">That's all folks!</div>
    </infinite-loading>
  </v-container>
</template>

<script>
import Card from "../Card";
import Movie from "../../models/Movie";
import Search from "../Search";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "RecentlyRated",
  components: {
    Card,
    Search,
    InfiniteLoading,
  },
  mounted: async function () {
    this.PAGE_SIZE = 6;
    this.offset = 0;
  },
  data: () => ({
    movies: [],
  }),
  methods: {
    infiniteHandler: async function ($state) {
      let { movies } = await Movie.getRecentlyRated(
        this.PAGE_SIZE,
        this.offset
      );
      if (movies.length > 0) {
        this.offset += this.PAGE_SIZE;
        this.movies.push(...movies);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>
