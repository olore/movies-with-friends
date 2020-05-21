<template>
  <button
    v-on:click="clicked"
    title="Open on rottentomatoes.com"
    class="align-center d-inline-flex"
  >
    <v-img
      class="icon-rt"
      alt="rottentomatoes logo"
      :src="require('../assets/rotten-tomatoes.svg')"
    ></v-img>
    <div class="body-1 ml-2">{{ rating }}</div>
  </button>
</template>
<script>
import rottenTomatoesIcon from "../assets/rotten-tomatoes.svg";

export default {
  name: "RottenTomatoesRating",
  props: ["rating", "title"],
  methods: {
    clicked: function () {
      window.open(
        `https://www.rottentomatoes.com/search?search=${this.title}`,
        "_blank"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-rt {
  height: 17px;
  width: 17px;
}
</style>
