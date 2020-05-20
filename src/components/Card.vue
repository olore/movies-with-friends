<template>
  <v-card class="mx-auto" max-width="300">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://m.media-amazon.com/images/M/MV5BMjAzMzI5OTgzMl5BMl5BanBnXkFtZTgwMTU5MTAwMDE@._V1_SX300.jpg"
    >
      <v-card-title></v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Ender's Game</v-card-subtitle>

    <v-card-text class="text--primary">
      <div
        class="d-inline-flex align-self-stretch justify-center"
        style="width: 100%;"
      >
        <IMDBRating value="6.6" class="mr-3"></IMDBRating>
        <RottenTomatoesRating value="62%"></RottenTomatoesRating>
      </div>

      <div>
        Young Ender Wiggin is recruited by the International Military to lead
        the fight against the Formics...
        <!-- an insectoid alien race who had previously tried to invade Earth and had inflicted heavy losses on humankind. -->
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
        href="https://reelgood.com/movie/enders-game-2013"
      >
        Where to watch?
      </v-btn>

      <v-btn color="orange" text>
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import IMDBRating from "./IMDBRating";
import RottenTomatoesRating from "./RottenTomatoesRating";
export default {
  name: "Card",
  components: {
    IMDBRating,
    RottenTomatoesRating,
  },
};
</script>
