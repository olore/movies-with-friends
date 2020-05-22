<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between">
        <button @click="goBack()">Back</button>
        <h2 class="headline">{{ movie.Title }}</h2>
        <span></span>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <div>
          <v-img
            alt="movie poster"
            max-width="140"
            :contain="false"
            :src="movie.Poster"
          />
        </div>
      </v-col>
      <v-col cols="3" d-flex-vertical>
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
          class="pa-0"
          color="orange"
          text
          target="_blank"
          :href="movie.getReelGoodLink()"
        >
          Where to watch?
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="px-5">
        {{ movie.Plot }}
      </v-col>
    </v-row>

    <v-row>
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
