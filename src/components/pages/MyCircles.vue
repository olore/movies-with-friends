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
        <v-expansion-panels>
          <v-expansion-panel
            v-for="item in ownedCircles"
            :key="item.name"
            class="my-0"
          >
            <v-expansion-panel-header class="d-flex py-4 px-4">
              <div style="min-width: 100px;">{{ item.name }}</div>
              <div class="text-center">
                {{ (item.members && item.members.length) || 0 }} members
              </div>
              <div style="min-width: 150px;" class="text-center">
                <CircleDialog
                  :onSave="reloadCircles"
                  :circle="item"
                  :edit="true"
                >
                </CircleDialog>
                <ConfirmDialog
                  :icon="iconDelete"
                  aria-label="Remove circle"
                  color="error"
                  :question="`Are you sure you want to remove ${item.name} ?`"
                  :approve="() => remove(item._id)"
                />
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="ma-0 pa-0">
              <div v-for="member in item.members" :key="member.googleId">
                {{ member.name }} {{ member.email }}
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td align="center" colspan="3">
                  <CircleDialog :onSave="reloadCircles" :circles="circles" />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        Member
        <v-expansion-panels>
          <v-expansion-panel
            v-for="circle in memberCircles"
            :key="circle.name"
            class="my-0"
          >
            <v-expansion-panel-header class="d-flex py-4 px-4">
              <div style="min-width: 100px;">{{ circle.name }}</div>
              <div class="text-center">
                {{ (item.members && item.members.length) || 0 }} members
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="ma-0 pa-0">
              <div v-for="member in item.members" :key="member.googleId">
                {{ member.name }} {{ member.email }}
              </div>
              <div class="pa-2" style="min-width: 150px;" align="center">
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
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CircleDialog from "../CircleDialog";
import Circle from "../../models/Circle";
import { mdiDelete, mdiMinus, mdiPencil } from "@mdi/js";
import { store } from "../../store";
import ConfirmDialog from "../ConfirmDialog";

export default {
  name: "MyCircles",
  components: { CircleDialog, ConfirmDialog },
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
