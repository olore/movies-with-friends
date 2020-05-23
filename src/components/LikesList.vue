<template>
  <div class="d-flex flex-column pt-3">
    <span class="headline">Your Friends</span>
    <v-row v-for="like in likes" :key="like.person.name">
      <v-col cols="4" sm="3">
        <v-rating
          v-model="like.rating"
          readonly
          dense
          size="20"
          class="mr-3"
        ></v-rating>
      </v-col>
      <v-col cols="8" sm="9">
        <span class="font-weight-bold">{{ like.person.name }}</span>
        <span class="" v-if="like.comment">
          - &quot;{{ like.comment }}&quot;</span
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "LikesList",
  props: ["likes"],
};
</script>
<style lang="scss" scoped></style>
