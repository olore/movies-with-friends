<template>
  <div class="d-flex flex-column pt-3">
    <v-row v-for="like in likes" :key="like.person.name">
      <v-col cols="4">
        <v-rating v-model="like.rating" readonly dense size="20"></v-rating>
        <span class="body-2 font-weight-bold ml-1">{{ like.person.name }}</span>
      </v-col>
      <v-col cols="8">
        <span class="" v-if="like.comment">
          &quot;{{ like.comment }}&quot;</span
        >
        <span class="overline vmiddle grey--text">{{ like.smallDate() }}</span>
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
<style lang="scss" scoped>
.vmiddle {
  vertical-align: middle;
  margin-left: 5px;
}
</style>
