<template>
  <v-container>
    <v-row class="my-0">
      <v-col cols="12">
        <span class="text-subtitle-1 font-weight-light">MovieRex</span>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12">
        <div class="text-center">
          <h1 class="text-h5 text-md-h4 pb-2">Find something new to watch</h1>
          <v-btn data-cy="launch" class="primary" x-large to="/recently-rated"
            >Launch MovieRex</v-btn
          >
          <p class="pt-2 text-md-h5">
            See recommendations from friends and family
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" class="d-flex justify-start">
        <div class="mt-6">
          <div class="font-weight-black">
            See recently viewed and rated movies!
          </div>

          <v-img
            max-width="300"
            v-if="$vuetify.breakpoint.smAndDown"
            src="movie-list-small.png"
          />
          <v-img
            max-width="800"
            v-if="$vuetify.breakpoint.mdAndUp"
            src="movie-list.png"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" class="d-flex justify-end">
        <div class="mt-6">
          <div class="font-weight-black">
            See what other people in your circles think about a movie!
          </div>
          <v-img
            max-width="200"
            v-if="$vuetify.breakpoint.smAndDown"
            src="terminator-review-small.png"
          />
          <v-img
            v-if="$vuetify.breakpoint.mdAndUp"
            max-width="800"
            src="terminator-review.png"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" class="">
        <div class="mt-16">
          <div class="font-weight-thin">Special thanks to</div>
          <ul class="font-weight-light">
            <li><a href="https://vuejs.org/">VueJS</a> JavaScript framework</li>
            <li>
              <a href="https://vuetifyjs.com/">Vuetify</a> component framework
            </li>
            <li>
              <a href="https://www.fastify.io/"> Fastify.io</a> Node.js server
              side framework (no express!)
            </li>
            <li>
              <a href="https://www.omdbapi.com/">Open Movie Data Base API</a>
            </li>
            <li>
              <a href="https://github.com/louischatriot/nedb">NeDB</a> in
              memory/file based document store
            </li>
            <li>
              <a
                href="https://github.com/mejiamanuel57/vue-google-signin-button-directive)"
                >Google Signin Button</a
              >
              inspiration"
            </li>
            <li>
              <a href="https://peachscript.github.io/vue-infinite-loading/"
                >Infinite Loader</a
              >
              component
            </li>
            <li>
              <a
                href="http://www.iconarchive.com/show/captiva-icons-by-bokehlicia/movie-icon.html"
                >Favicon</a
              >
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Splash",
  data: function () {
    return {};
  },
};
</script>
