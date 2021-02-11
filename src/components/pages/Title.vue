<template>
  <v-container v-if="movie">
    <v-row class="my-0">
      <v-col cols="12" class="d-flex justify-space-between">
        <v-btn @click="goBack()" class="mr-2" icon color="primary">
          <v-icon> {{ iconBack }} </v-icon>
        </v-btn>
        <h2 class="headline">{{ movie.Title }}</h2>
        <v-btn @click="goBack()" class="ml-2" icon color="primary">
          <v-icon> {{ iconBack }} </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-md-center my-0">
      <v-col sm="4" col="6">
        <v-img
          class="float-right"
          :alt="`Poster for {{ movie.Title }}`"
          :contain="false"
          :src="movie.Poster"
          :max-width="imageWidth"
        />
      </v-col>

      <v-col col="6" class="d-flex flex-column">
        <v-container class="pa-0 pl-3">
          <v-row class="my-0">
            <IMDBRating
              :rating="movie.imdbRating"
              :imdbid="movie.imdbID"
              class="mr-3"
            ></IMDBRating>
          </v-row>
          <v-row v-if="movie.hasRottenTomatoesRating()" class="my-0">
            <RottenTomatoesRating
              :rating="movie.getRottenTomatoesRating()"
              :title="movie.Title"
              :imdbid="movie.imdbID"
            ></RottenTomatoesRating>
          </v-row>
          <v-row class="my-0">
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

          <v-row class="my-0">
            <RatingDialog
              :imdbID="movie.imdbID"
              :onSave="reload"
              :myLike="myLike"
              class="ma-3"
            />
          </v-row>

          <LikesList
            :likes="movie.likes"
            :likers="movie.likers"
            v-if="$vuetify.breakpoint.smAndUp && movie.likes.length"
            data-cy="likes-list"
          />
        </v-container>
      </v-col>
    </v-row>

    <LikesList
      v-if="$vuetify.breakpoint.xsOnly && movie.likes.length"
      :likes="movie.likes"
      :likers="movie.likers"
    />

    <v-row class="d-flex my-0">
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
import { mdiArrowLeftCircle } from "@mdi/js";

export default {
  name: "Title",
  components: { IMDBRating, RottenTomatoesRating, RatingDialog, LikesList },
  data: () => ({
    movie: null,
    iconBack: mdiArrowLeftCircle,
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
        return like.googleId === store.state.user.googleId;
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
