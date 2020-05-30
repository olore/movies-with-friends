<template>
  <v-container v-if="movie">
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
          :max-width="imageWidth"
        />
      </v-col>

      <v-col sm="6" xs="6" class="d-flex flex-column">
        <v-container class="pa-0 pl-3">
          <v-row>
            <IMDBRating
              :rating="movie.imdbRating"
              :imdbid="movie.imdbID"
              class="mr-3"
            ></IMDBRating>
          </v-row>
          <v-row v-if="movie.hasRottenTomatoesRating()">
            <RottenTomatoesRating
              :rating="movie.getRottenTomatoesRating()"
              :title="movie.Title"
              :imdbid="movie.imdbID"
            ></RottenTomatoesRating>
          </v-row>
          <v-row>
            <v-btn
              class="pa-0 d-inline-flex"
              color="orange"
              text
              target="_blank"
              :href="movie.getReelGoodLink()"
            >
              Where to watch?
            </v-btn>
          </v-row>

          <v-row>
            <RatingDialog
              :imdbID="movie.imdbID"
              :onSave="reload"
              :myLike="myLike"
              class="ma-3"
            />
          </v-row>

          <LikesList :likes="movie.likes" v-if="$vuetify.breakpoint.smAndUp" />
        </v-container>
      </v-col>
    </v-row>

    <LikesList v-if="$vuetify.breakpoint.xsOnly" :likes="movie.likes" />

    <v-row class="d-flex">
      <v-col cols="12" class="px-5">
        {{ movie.Plot }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Movie from "../../models/Movie";
import IMDBRating from "../ratings/IMDBRating";
import RottenTomatoesRating from "../ratings/RottenTomatoesRating";
import RatingDialog from "../RatingDialog";
import LikesList from "../LikesList";
import { store } from "../../store";

export default {
  name: "Title",
  components: { IMDBRating, RottenTomatoesRating, RatingDialog, LikesList },
  data: () => ({
    movie: null,
  }),
  async beforeRouteEnter(to, from, next) {
    const movie = await Movie.getById(to.params.id);
    next((vm) => {
      vm.movie = movie;
    });
  },
  watch: {
    movie: function (val, oldVal) {
      this.myLike = this.movie.likes.find((like) => {
        // return like.googleId === store.state.user.googleId;
        return like.name === store.state.user.name; // FIXME this shouldb't be based on name, but store doesn't have googleId
      });
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    reload: async function () {
      this.movie = await Movie.getById(this.movie.imdbID);
    },
  },
  computed: {
    imageWidth() {
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
