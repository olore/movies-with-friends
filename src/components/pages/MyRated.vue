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
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="waveDots"
      :forceUseInfiniteWrapper="true"
      :identifier="reset"
    >
      <div slot="no-more">
        <v-chip class="ma-2 pa-4">
          That's all folks!
        </v-chip>
      </div>
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
    sortOrder: "date",
    movies: [],
    reset: new Date(),
  }),
  methods: {
    sort: async function (sortBy) {
      this.sortOrder = sortBy;
      this.reset = new Date();
      this.movies = [];
      this.offset = 0;
    },
    infiniteHandler: async function ($state) {
      let movies = await Movie.getMyRated(
        this.PAGE_SIZE,
        this.offset,
        this.sortOrder
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
