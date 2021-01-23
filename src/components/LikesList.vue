<template>
  <div class="d-flex flex-column pt-3">
    <v-row v-for="like in sortedLikes" :key="like.name" class="my-0">
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

        <v-btn
          :to="{ name: 'circle-movies', params: { id: circle._id } }"
          v-for="circle in circlesFor(like.googleId)"
          v-bind:key="circle._id"
          class="ma-2 green darken-4"
          text
          :rounded="true"
          x-small
        >
          {{ circle.name }}
        </v-btn>

        <span class="overline vmiddle grey--text">{{ like.smallDate() }}</span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { store } from "../store";

export default {
  name: "LikesList",
  props: ["likes", "likers"],
  computed: {
    sortedLikes: function () {
      // Order: 1) User like, 2) Circle likes, 3) Others
      const gid = store.state.user.googleId;
      let likes = this.likes;
      let sorted = [];
      let userLike = likes.find((like) => {
        return like.googleId === gid;
      });
      if (userLike) {
        sorted.push(userLike);
        likes = this.likes.filter((like) => {
          return like.googleId !== gid;
        });
      }
      let noCircles = [];
      for (let i = 0; i < likes.length; i++) {
        if (this.circlesFor(likes[i].googleId).length > 0) {
          sorted.push(likes[i]);
        } else {
          noCircles.push(likes[i]);
        }
      }
      sorted.push(...noCircles);
      return sorted;
    },
  },
  methods: {
    circlesFor: function (gid) {
      return this.likers[gid] || [];
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
