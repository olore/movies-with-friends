<template>
  <div class="d-flex flex-column pt-3">
    <v-row v-for="like in likes" :key="like.name">
      <v-col cols="4">
        <v-rating v-model="like.rating" readonly dense size="20"></v-rating>
        <span class="body-2 font-weight-bold ml-1">{{ like.name }}</span>
      </v-col>
      <v-col cols="8">
        <span class="" v-if="like.comment">
          &quot;{{ like.comment }}&quot;</span
        >
        <span v-else class="font-italic">
          No comment
        </span>

        <v-chip
          v-for="circle in groupsFor(like.googleId)"
          v-bind:key="circle._id"
          class="ma-2"
          color="accent"
          x-small
        >
          {{ circle.name }}
        </v-chip>
        <span class="overline vmiddle grey--text">{{ like.smallDate() }}</span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "LikesList",
  props: ["likes", "likers"],
  methods: {
    groupsFor: function (gid) {
      if (this.likers[gid]) {
        return this.likers[gid].map((g) => {
          return { name: g.name, _id: g._id };
        });
      }
      return [];
    },
  },
};
</script>
<style lang="scss" scoped>
.vmiddle {
  vertical-align: middle;
  margin-left: 5px;
}
</style>
