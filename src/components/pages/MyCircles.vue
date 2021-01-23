<template>
  <v-container>
    <v-row class="my-0">
      <v-col cols="12">
        <span class="headline">My Circles</span>
      </v-col>
    </v-row>
    <v-row class="my-0" justify="center">
      <v-col cols="12" sm="8">
        <span class="title">Owner</span>
        <v-expansion-panels>
          <v-expansion-panel v-for="circle in ownedCircles" :key="circle.name">
            <v-expansion-panel-header class="d-flex py-2 px-4">
              <v-row class="my-0">
                <v-col cols="6">
                  <div style="min-width: 100px;">{{ circle.name }}</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ (circle.members && circle.members.length) || 0 }} members
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="my-0">
                <v-col col="6">
                  <div v-for="member in circle.members" :key="member.googleId">
                    {{ member.name }} {{ member.email }}
                  </div>
                </v-col>
                <v-col col="6">
                  <div align="right">
                    <CircleDialog
                      :onSave="reloadCircles"
                      :circle="circle"
                      :edit="true"
                    >
                    </CircleDialog>
                    <ConfirmDialog
                      :icon="iconDelete"
                      aria-label="Remove circle"
                      color="error"
                      :question="`Are you sure you want to remove ${circle.name} ?`"
                      :approve="() => remove(circle._id)"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel :disabled="true" class="pa-2" align="center">
            <CircleDialog :onSave="reloadCircles" :circles="circles" />
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="title pt-4">Member</div>
        <v-expansion-panels>
          <v-expansion-panel v-for="circle in memberCircles" :key="circle.name">
            <v-expansion-panel-header class="d-flex py-2 px-4">
              <v-row class="my-0">
                <v-col cols="6">
                  <div>{{ circle.name }}</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ (circle.members && circle.members.length) || 0 }} members
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="my-0">
                <v-col col="6">
                  <div v-for="member in circle.members" :key="member.googleId">
                    {{ member.name }} {{ member.email }}
                  </div>
                </v-col>
                <v-col col="6">
                  <div class="pa-2" align="right">
                    <ConfirmDialog
                      :icon="iconLeave"
                      aria-label="Leave Circle"
                      color="error"
                      :question="`Are you sure you want to leave ${circle.name} ?`"
                      :approve="() => removeMe(circle)"
                    />
                  </div>
                </v-col>
              </v-row>
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
import { mdiDelete, mdiMinus, mdiPencil, mdiExitRun } from "@mdi/js";
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
    iconLeave: mdiExitRun,
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
