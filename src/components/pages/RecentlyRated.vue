<template>
  <v-container class="">
    <v-row class="justify-center my-0">
      <v-col cols="12" md="6">
        <Search />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12">
        <h1 class="headline">Recently Rated</h1>
      </v-col>
    </v-row>
    <MovieList movie-fn-name="getRecentlyRated" />
  </v-container>
</template>

<script>
import Search from "../Search";
import MovieList from "../MovieList";

export default {
  name: "RecentlyRated",
  components: {
    Search,
    MovieList,
  },
};
</script>
