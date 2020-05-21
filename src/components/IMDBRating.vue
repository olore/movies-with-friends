<template>
  <button v-on:click="clicked" class="align-center d-inline-flex">
    <v-img class="icon-imdb" :src="require('../assets/imdb.svg')"></v-img>
    <div class="ml-2">
      <span class="body-1">{{ rating }}</span
      >/<span class="caption">10</span>
    </div>
  </button>
</template>
<script>
import imdbIcon from "../assets/imdb.svg";

export default {
  name: "IMDBRating",
  props: ["rating", "imdbid"],
  methods: {
    clicked: function () {
      window.open(
        `https://www.imdb.com/title/${this.imdbid}/?ref_=nv_sr_srsg_0`,
        "_blank"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-imdb {
  height: 17px;
  width: 30px;
}
</style>
