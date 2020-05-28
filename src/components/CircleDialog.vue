<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-2" v-on="on" fab small color="green">
        <v-icon>{{ iconPlus }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Let's make a Circle!
      </v-card-title>
      <!-- <v-card-subtitle
        >A Circle is a group of people that share movie recommendations. People
        in the circle will only be able to see recommendations from others
        within the Circle.</v-card-subtitle
      > -->
      <v-card-text class="d-flex flex-column justify-center">
        <v-text-field
          v-model="name"
          label="Circle Name"
          name="name"
        ></v-text-field>
      </v-card-text>

      <v-card-text class="d-flex flex-column justify-center">
        <v-textarea
          label="Invite some people to this Circle (or do it later!)"
          name="invitees"
          v-model="invitees"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :loading="isLoading" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import Circle from "../models/Circle";

export default {
  name: "CircleDialog",
  data: () => ({
    dialog: false,
    invitees: null,
    name: null,
    error: null,
    isLoading: false,
    iconPlus: mdiPlus,
  }),
  props: ["circles", "onSave"],
  mounted: function () {
    // if (this.myLike) {
    //   this.rating = this.myLike.rating;
    //   this.comment = this.myLike.comment;
    // }
  },
  methods: {
    save: async function () {
      this.isLoading = true;
      try {
        let res = await Circle.save({
          invitees: this.invitees,
          name: this.name,
        });
        if (res) {
          this.dialog = false; // close dialog
          this.onSave();
        } else {
          console.error(err);
        }
        this.name = null;
        this.invitees = null;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
