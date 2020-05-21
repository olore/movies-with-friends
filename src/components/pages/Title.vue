<template>
  <div class="pa-1">
    <v-row>
      <v-col cols="12" class="pa-3">
        <v-row class="d-flex justify-space-between px-5">
          <button @click="goBack()">Back</button>
          <h2 class="headline">{{ movie.Title }}</h2>
          <button @click="goBack()">Close</button>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pa-3">
        <div class="d-flex justify-space-around pt-3">
          <v-img
            alt="movie poster"
            max-width="140"
            :contain="false"
            :src="movie.Poster"
          />

          <div align-top>
            <IMDBRating
              :rating="movie.imdbRating"
              :imdbid="movie.imdbID"
              class="mr-3"
            ></IMDBRating>

            <RottenTomatoesRating
              v-if="movie.hasRottenTomatoesRating()"
              :rating="movie.getRottenTomatoesRating()"
              :title="movie.Title"
            ></RottenTomatoesRating>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="px-5">
        {{ movie.Plot }}
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pa-3">
        <h2 class="headline">Liked by</h2>
        <ul class="pl-8">
          <li>Brian O</li>
          <li>Dana O</li>
        </ul>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pa-3">
        <v-btn
          color="orange"
          text
          target="_blank"
          :href="movie.getReelGoodLink()"
        >
          Where to watch?
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Movie from "../../models/Movie";
import IMDBRating from "../ratings/IMDBRating";
import RottenTomatoesRating from "../ratings/RottenTomatoesRating";

export default {
  name: "Title",
  components: { IMDBRating, RottenTomatoesRating },
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
};
</script>
