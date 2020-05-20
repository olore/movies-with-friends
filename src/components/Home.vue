<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="pa-2">Recently favorited movies</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row>
          <Card tile v-for="n in 15" :key="n" class="ma-1 pa-1" />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from "./Card";
import { mdiViewDashboard, mdiCog } from "@mdi/js";

export default {
  name: "Home",
  components: {
    Card,
  },
};
</script>
