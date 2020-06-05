<template>
  <v-container class="" v-if="circle">
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <Search />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0">
        <v-chip class="ma-2 green darken-4" x-large>
          {{ circle.name }}
        </v-chip>
      </v-col>
    </v-row>
    <MovieList movie-fn-name="getForCircle" :circle="circle" />
  </v-container>
</template>

<script>
import Search from "../Search";
import MovieList from "../MovieList";
import Circle from "../../models/Circle";

export default {
  name: "CircleMovies",
  components: {
    Search,
    MovieList,
  },
  data: () => ({
    circle: null,
  }),
  async beforeRouteEnter(to, from, next) {
    const circle = await Circle.getById(to.params.id);
    next((vm) => {
      vm.circle = circle;
    });
  },
};
</script>
