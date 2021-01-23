<template>
  <v-container class="">
    <v-row class="justify-center my-0">
      <v-col cols="12" md="6">
        <Search />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="6" class="py-0">
        <span class="headline">My Rated</span>
      </v-col>
    </v-row>
    <MovieList movie-fn-name="getMyRated" :hide-include-me="true" />
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
