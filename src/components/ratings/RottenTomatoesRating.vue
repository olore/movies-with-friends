<template>
  <v-btn
    color="transparent"
    target="_blank"
    :href="`https://www.rottentomatoes.com/search?search=${this.title}`"
    rel="noreferrer"
    title="Open on rottentomatoes.com"
    :depressed="true"
    class="pa-1 align-center d-inline-flex"
  >
    <v-img
      class="icon-rt"
      alt="rottentomatoes logo"
      :src="require('../../assets/rotten-tomatoes.svg')"
    ></v-img>
    <div class="body-1 ml-2">{{ rating }}</div>
  </v-btn>
</template>
<script>
export default {
  name: "RottenTomatoesRating",
  props: ["rating", "title", "imdbid"],
};
</script>
<style lang="scss" scoped>
.icon-rt {
  height: 17px;
  width: 17px;
}
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0;
}
</style>
