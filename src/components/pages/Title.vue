<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between">
        <button @click="goBack()" class="mr-2">Back</button>
        <h2 class="headline">{{ movie.Title }}</h2>
        <button @click="goBack()" class="mr-2">Back</button>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-md-center">
      <v-col sm="4" xs="6">
        <v-img
          class="float-right"
          alt="movie poster"
          :contain="false"
          :src="movie.Poster"
          :max-width="imageHeight"
        />
      </v-col>

      <v-col sm="4" xs="6" class="d-flex flex-column align-start">
        <IMDBRating
          :rating="movie.imdbRating"
          :imdbid="movie.imdbID"
          class="mr-3"
        ></IMDBRating>

        <RottenTomatoesRating
          v-if="movie.hasRottenTomatoesRating()"
          :rating="movie.getRottenTomatoesRating()"
          :title="movie.Title"
          :imdbid="movie.imdbID"
        ></RottenTomatoesRating>
        <v-btn
          class="pa-0 d-inline-flex"
          color="orange"
          text
          target="_blank"
          :href="movie.getReelGoodLink()"
        >
          Where to watch?
        </v-btn>

        <RatingDialog class="ma-3" />

        <div class="d-none d-sm-flex flex-column pt-3">
          {{ movie.Plot }}
          <br />
          <br />
          <h2 class="headline">Liked by</h2>
          <ul class="pl-8">
            <li v-for="like in movie.likes" :key="like.person.name">
              {{ like.person.name }}
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>

    <v-row class="d-flex d-sm-none">
      <v-col cols="12" class="px-5">
        {{ movie.Plot }}
      </v-col>
    </v-row>

    <v-row class="d-flex d-sm-none">
      <v-col cols="12" class="pa-3">
        <h2 class="headLikeline">Liked by</h2>
        <ul class="pl-8">
          <li v-for="like in movie.likes" :key="like.person.name">
            {{ like.person.name }}
          </li>
        </ul>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pa-3"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Movie from "../../models/Movie";
import IMDBRating from "../ratings/IMDBRating";
import RottenTomatoesRating from "../ratings/RottenTomatoesRating";
import RatingDialog from "../RatingDialog";

export default {
  name: "Title",
  components: { IMDBRating, RottenTomatoesRating, RatingDialog },
  data: () => ({
    movie: null,
  }),
  created: function () {
    let title = this.$route.params.title;
    this.movie = Movie.getByTitle(title);
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "150px";
        default:
          return "300px";
      }
    },
  },
};
</script>
