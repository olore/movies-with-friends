<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="headline">Circle Invite</span>
      </v-col>
    </v-row>

    <v-row justify="center" v-if="circle">
      <v-col cols="12" sm="8">
        {{ circle.name }}
        <v-btn @click="joinCircle()" v-if="!success && !error">Join</v-btn>

        <div v-if="success">
          Joined!
        </div>
        <div v-if="error">
          {{ error }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Circle from "../../models/Circle";
import { mdiDelete, mdiPencil } from "@mdi/js";
import { store } from "../../store";

export default {
  name: "JoinCircle",
  data: () => ({
    circle: null,
    success: null,
    error: null,
  }),
  async beforeRouteEnter(to, from, next) {
    const circle = await Circle.getById(to.params.id);
    vm.circle = circle;
    next();
  },
  methods: {
    joinCircle: async function () {
      let res = await Circle.join(this.circle._id);
      if (res) {
        this.success = true;
      } else {
        this.error = "Failed, Sorry.";
      }
    },
  },
};
</script>
