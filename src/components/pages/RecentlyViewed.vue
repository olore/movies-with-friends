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
    <MovieList movie-fn-name="getRecentlyViewed" :disable-sort="true" />
  </v-container>
</template>

<script>
import Search from "../Search";
import MovieList from "../MovieList";

export default {
  name: "RecentlyViewed",
  components: {
    Search,
    MovieList,
  },
};
</script>
