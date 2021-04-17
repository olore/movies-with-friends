<template>
  <v-dialog
    v-model="dialog"
    width="500"
    :persistent="true"
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="edit"
        class="mx-2"
        v-on="on"
        fab
        small
        color="primary darken-2"
        aria-label="Edit Circle"
      >
        <v-icon>{{ iconPencil }}</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mx-2"
        v-on="on"
        fab
        small
        color="green darken-2"
        aria-label="Add Circle"
      >
        <v-icon>{{ iconPlus }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title v-if="edit">Edit Circle</v-card-title>
      <v-card-title v-else> Let's make a Circle! </v-card-title>
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

      <v-card-text
        v-if="circle && circle._id"
        class="d-flex flex-column justify-center"
      >
        <v-textarea
          label="Send to your Friends"
          rows="3"
          :value="getInviteText()"
        ></v-textarea>
      </v-card-text>

      <v-card-text>
        <v-container v-if="circle">
          <v-row class="my-0" justify="center">
            <v-col cols="12" sm="8">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr
                      v-for="member in circle.members"
                      :key="member._id"
                      class="my-4"
                    >
                      <td class="pa-2">
                        {{ member.name }} {{ member._id }}
                        <span v-if="isOwner(member)"> (Owner)</span>
                      </td>
                      <td class="pa-2" align="center">
                        <ConfirmDialog
                          :icon="iconDelete"
                          v-if="!isOwner(member)"
                          aria-label="Remove member"
                          color="error"
                          :question="`Are you sure you want to remove ${member.name} from this Circle?`"
                          :approve="() => remove(member)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="cancel"> Cancel </v-btn>
        <v-btn color="primary" text :loading="isLoading" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus, mdiPencil, mdiDelete } from "@mdi/js";
import Circle from "../models/Circle";
import ConfirmDialog from "./ConfirmDialog";

export default {
  name: "CircleDialog",
  components: { ConfirmDialog },
  data: () => ({
    dialog: false,
    name: null,
    error: null,
    isLoading: false,
    iconPlus: mdiPlus,
    iconPencil: mdiPencil,
    iconDelete: mdiDelete,
  }),
  props: ["onSave", "edit", "circle", "circles"],
  mounted: function () {
    if (this.circle) {
      this.name = this.circle.name;
      this._id = this.circle._id;
    }
  },
  methods: {
    isOwner: function (member) {
      return member.googleId === this.circle.owner.googleId;
    },
    getInviteText: function () {
      return `Come and join my Movie Circle: ${this.getInviteLink()}`;
    },
    getInviteLink: function () {
      // I hate you
      if (document.location.port) {
        return `${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/circles/${this.circle._id}/join`;
      } else {
        return `${document.location.protocol}//${document.location.hostname}/#/circles/${this.circle._id}/join`;
      }
    },
    remove: function (memberToRemove) {
      // eslint-disable-next-line
      this.circle.members = this.circle.members.filter((member) => {
        return member._id !== memberToRemove._id;
      });
    },
    cancel: function () {
      if (this.circle) {
        this.name = this.circle.name;
      }
      this.dialog = false;
    },
    save: async function () {
      this.isLoading = true;
      try {
        let res;
        if (this.circle) {
          // eslint-disable-next-line
          this.circle.name = this.name;
          res = await Circle.save(this.circle);
        } else {
          res = await Circle.create(this.name);
        }

        if (res) {
          this.dialog = false; // close dialog
          this.onSave();
        } else {
          console.error(err);
        }
        this.name = null;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
