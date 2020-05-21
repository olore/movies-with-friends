<template>
  <v-card class="mx-auto" max-width="300">
    <v-img class="white--text align-end" height="200px" :src="movie.image">
      <v-card-title></v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{ movie.title }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div
        class="d-inline-flex align-self-stretch justify-center"
        style="width: 100%;"
      >
        <IMDBRating
          :rating="movie.imdbRating"
          :imdbid="movie.imdbid"
          class="mr-3"
        ></IMDBRating>
        <RottenTomatoesRating
          :rating="movie.tomatoesRating"
          :title="movie.title"
        ></RottenTomatoesRating>
      </div>

      <div>
        {{ movie.description }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text target="_blank" :href="reelGoodLink()">
        Where to watch?
      </v-btn>

      <v-btn color="orange" text>
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import IMDBRating from "./ratings/IMDBRating";
import RottenTomatoesRating from "./ratings/RottenTomatoesRating";
export default {
  name: "Card",
  data: () => ({
    movie: {
      title: "Ender's Game",
      description:
        "Young Ender Wiggin is recruited by the International Military to lead the fight against the Formics...",
      //an insectoid alien race who had previously tried to invade Earth and had inflicted heavy losses on humankind.
      image:
        "https://m.media-amazon.com/images/M/MV5BMjAzMzI5OTgzMl5BMl5BanBnXkFtZTgwMTU5MTAwMDE@._V1_SX300.jpg",
      imdbRating: "6.6",
      tomatoesRating: "62%",
      imdbid: "tt1731141",
      year: "2013",
    },
  }),
  components: {
    IMDBRating,
    RottenTomatoesRating,
  },
  methods: {
    reelGoodLink: function () {
      return (
        "https://reelgood.com/movie/" +
        this.movie.title.replace(/ /, "-").replace("'", "") +
        "-" +
        this.movie.year
      );
    },
  },
};
</script>
