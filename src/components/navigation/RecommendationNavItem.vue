<template>
  <v-list-item>
    <template v-slot:default="{ active, toggle }">
      <v-list-item-action>
        <v-checkbox
          v-model="active"
          color="primary"
          @click="toggle"
        ></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item-content>
    </template>
  </v-list-item>
</template>
<script>
export default {
  name: "RecommendationNavItem",
  props: {
    name: String,
  },
};
</script>
