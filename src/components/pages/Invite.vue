<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="headline">Invite Your Friends</span>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-textarea
          outlined
          label="Add email addresses to invite your friends"
          name="emails"
        ></v-textarea>
        <v-spacer />
        <v-textarea
          outlined
          label="Customise the message they will get"
          value="Check out this great site I found where we can share movie recommendations!"
          name="messageBody"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn color="primary" class="title" large>Send Invites</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" class="d-flex justify-center">
        * We will only use their email address for good
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Invite",
};
</script>
