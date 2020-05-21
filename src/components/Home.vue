<template>
  <div class="pa-1">
    <v-row>
      <v-col cols="12">
        <span class="headline pa-2">Recent favorites</span>
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
