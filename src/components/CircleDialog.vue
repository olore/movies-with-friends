<template>
  <v-dialog v-model="dialog" width="500" :persistent="true">
    <template v-slot:activator="{ on }">
      <v-btn v-if="edit" class="mx-2" v-on="on" fab small color="primary">
        <v-icon>{{ iconPencil }}</v-icon>
      </v-btn>
      <v-btn v-else class="mx-2" v-on="on" fab small color="green">
        <v-icon>{{ iconPlus }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title v-if="edit">Edit Circle</v-card-title>
      <v-card-title v-else>
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
        <v-btn color="secondary" text @click="cancel">
          Cancel
        </v-btn>
        <v-btn color="primary" text :loading="isLoading" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus, mdiPencil } from "@mdi/js";
import Circle from "../models/Circle";

export default {
  name: "CircleDialog",
  data: () => ({
    dialog: false,
    name: null,
    invitees: null,
    error: null,
    isLoading: false,
    iconPlus: mdiPlus,
    iconPencil: mdiPencil,
  }),
  props: ["onSave", "edit", "circle", "circles"],
  mounted: function () {
    if (this.circle) {
      this.name = this.circle.name;
      this.invitees = this.circle.invitees;
      this._id = this.circle._id;
    }
  },
  methods: {
    cancel: function () {
      if (this.circle) {
        this.name = this.circle.name;
        this.invitees = this.circle.invitees;
        this._id = this.circle._id;
      }
      this.dialog = false;
    },
    save: async function () {
      this.isLoading = true;
      try {
        let res = await Circle.save({
          _id: this._id,
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
