<template>
  <div class="align-center d-inline-flex">
    <v-img
      class="icon-rt"
      :src="require('../assets/rotten-tomatoes.svg')"
    ></v-img>
    <div class="body-1 ml-2">{{ value }}</div>
  </div>
</template>
<script>
import rottenTomatoesIcon from "../assets/rotten-tomatoes.svg";

export default {
  name: "RottenTomatoesRating",
  props: ["value"],
};
</script>
<style lang="scss" scoped>
.icon-rt {
  height: 17px;
  width: 17px;
}
</style>
