<template>
  <div class="align-center d-inline-flex">
    <v-img class="icon-imdb" :src="require('../assets/imdb.svg')"></v-img>
    <div class="ml-2">
      <span class="body-1">{{ value }}</span
      >/<span class="caption">10</span>
    </div>
  </div>
</template>
<script>
import imdbIcon from "../assets/imdb.svg";

export default {
  name: "IMDBRating",
  props: ["value"],
};
</script>
<style lang="scss" scoped>
.icon-imdb {
  height: 17px;
  width: 30px;
}
</style>
