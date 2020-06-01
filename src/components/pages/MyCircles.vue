<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="headline">My Circles</span>
      </v-col>
    </v-row>
    <v-row class="" justify="center">
      <v-col cols="12" sm="8">
        Owner
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="item in ownedCircles" :key="item.name" class="my-4">
                <td class="pa-2">{{ item.name }}</td>
                <td class="pa-2 text-center">
                  {{ (item.members && item.members.length) || 0 }} members
                </td>
                <td class="pa-2" style="min-width: 150px;" align="center">
                  <CircleDialog
                    :onSave="reloadCircles"
                    :circle="item"
                    :edit="true"
                  >
                  </CircleDialog>
                  <v-btn
                    class="mx-2"
                    fab
                    small
                    color="error"
                    aria-label="Remove circle"
                    @click="remove(item._id)"
                  >
                    <v-icon>{{ iconDelete }}</v-icon>
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
        Member
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="circle in memberCircles"
                :key="circle.name"
                class="my-4"
              >
                <td class="pa-2">{{ circle.name }}</td>
                <td class="pa-2 text-center">
                  {{ (circle.members && circle.members.length) || 0 }} members
                </td>
                <td class="pa-2" style="min-width: 150px;" align="center">
                  <v-btn
                    class="mx-2"
                    fab
                    small
                    color="error"
                    aria-label="Remove me"
                    @click="removeMe(circle)"
                  >
                    <v-icon>{{ iconMinus }}</v-icon>
                  </v-btn>
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
import { mdiDelete, mdiMinus, mdiPencil } from "@mdi/js";
import { store } from "../../store";

export default {
  name: "MyCircles",
  components: { CircleDialog },
  mounted: async function () {
    this.circles = (await Circle.all()) || [];
  },
  data: () => ({
    iconPencil: mdiPencil,
    iconDelete: mdiDelete,
    iconMinus: mdiMinus,
    circles: [],
  }),
  computed: {
    ownedCircles: function () {
      return this.circles.filter((circle) => {
        return circle.owner.googleId === store.state.user.googleId;
      });
    },
    memberCircles: function () {
      return this.circles.filter((circle) => {
        return circle.owner.googleId !== store.state.user.googleId;
      });
    },
  },
  methods: {
    removeMe: async function (circle) {
      await Circle.removeMe(circle._id);
      this.reloadCircles();
    },
    remove: async function (id) {
      await Circle.remove(id);
      this.reloadCircles();
    },
    reloadCircles: async function () {
      this.circles = (await Circle.all()) || [];
    },
  },
};
</script>
