<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="headline">Invite</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          solo
          label="Add email addresses to invite your friends"
          name="emailList"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn color="orange" class="title" raised large text
          >Send Invites</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Invite",
};
</script>
