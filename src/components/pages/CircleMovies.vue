<template>
  <v-container v-if="circle">
    <v-row class="justify-center my-0">
      <v-col cols="12" md="6">
        <Search />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" md="4" class="py-0">
        <v-overflow-btn
          class="my-dropdown mt-0"
          :items="myCircles"
          item-value="_id"
          item-text="name"
          :label="circle.name"
          :value="circle._id"
          :filled="true"
          @change="changeGroup"
        ></v-overflow-btn>
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
    myCircles: [],
  }),
  methods: {
    changeGroup: function (circleId) {
      this.$router.push({ name: "circle-movies", params: { id: circleId } });
    },
  },
  async beforeRouteUpdate(to, from, next) {
    this.circle = null; // this is hacky. Should MovieList 'watch' circle?
    this.myCircles = await Circle.all();
    this.circle = this.myCircles.find((c) => c._id === to.params.id);
    next();
  },
  async beforeRouteEnter(to, from, next) {
    const myCircles = await Circle.all();
    const circle = myCircles.find((c) => c._id === to.params.id);
    next((vm) => {
      vm.myCircles = myCircles;
      vm.circle = circle;
    });
  },
};
</script>
<style lang="scss">
.my-dropdown {
  .v-text-field__details {
    display: none;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
}
</style>
