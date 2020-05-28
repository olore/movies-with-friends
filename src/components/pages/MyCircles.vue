<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="headline">My Circles</span>
      </v-col>
    </v-row>
    <v-row class="" justify="center">
      <v-col cols="12" sm="8">
        <v-simple-table>
          <template v-slot:default>
            <!-- <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Members</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead> -->
            <tbody>
              <tr v-for="item in circles" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.members || 0 }} members</td>
                <td align="center">
                  <v-btn class="mx-2" fab small color="primary">
                    <v-icon>{{ iconPencil }}</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab small color="error">
                    <v-icon @click="remove(item._id)">{{ iconDelete }}</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <td align="center" colspan="3">
                  <CircleDialog :onSave="reloadCircles" :circles="circles" />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CircleDialog from "../CircleDialog";
import Circle from "../../models/Circle";
import { mdiDelete, mdiPencil } from "@mdi/js";

export default {
  name: "MyCircles",
  components: { CircleDialog },
  mounted: async function () {
    this.circles = await Circle.all();
  },
  data: () => ({
    iconPencil: mdiPencil,
    iconDelete: mdiDelete,
    circles: [],
  }),
  methods: {
    remove: async function (id) {
      await Circle.remove(id);
      this.reloadCircles();
    },
    reloadCircles: async function () {
      this.circles = await Circle.all();
    },
  },
};
</script>
