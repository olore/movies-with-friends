<template>
  <v-btn
    color="transparent"
    target="_blank"
    :href="`https://www.imdb.com/title/${this.imdbid}`"
    rel="noreferrer"
    title="Open on imdb.com"
    :depressed="true"
    class="pa-1 align-center d-inline-flex"
  >
    <v-img
      class="icon-imdb"
      alt="imdb logo"
      :src="require('../../assets/imdb.svg')"
    ></v-img>
    <div class="ml-2">
      <span class="body-1">{{ filteredRating }}</span
      >/<span class="caption">10</span>
    </div>
  </v-btn>
</template>
<script>
export default {
  name: "IMDBRating",
  props: ["rating", "imdbid"],
  computed: {
    filteredRating: function () {
      if (this.rating === "N/A") {
        return "??";
      }
      return this.rating;
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-imdb {
  height: 17px;
  width: 30px;
}
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0;
}
</style>
