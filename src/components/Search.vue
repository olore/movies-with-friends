<template>
  <v-card>
    <v-card-text class="pa-2 d-flex">
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        :flat="true"
        color="white"
        dense
        hide-no-data
        append-icon=""
        hide-details
        hide-selected
        item-text="Title"
        item-value="Title"
        placeholder="Search..."
        class="pa-0 mr-5"
      >
        <template v-slot:item="{ item }">
          <v-list-item-content @click="selected(item)">
            <v-list-item-title
              class="py-1 body-1"
              v-text="item.Title"
            ></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
      <v-btn color="primary" dense aria-label="Search">
        <template v-slot:default>
          <v-icon>{{ iconSearch }}</v-icon>
        </template>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiTextSearch, mdiMagnify } from "@mdi/js";
import Movie from "../models/Movie";

export default {
  data: () => ({
    descriptionLimit: 50,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    iconSearch: mdiMagnify,
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      if (this.entries) {
        return this.entries.map((entry) => {
          let Title =
            entry.Title.length > this.descriptionLimit
              ? entry.Title.slice(0, this.descriptionLimit) + "..."
              : entry.Title;
          Title = `${Title} (${entry.Year})`;
          return Object.assign({}, entry, { Title });
        });
      } else {
        return [];
      }
    },
  },

  methods: {
    selected: function (movie) {
      this.$router.push({ name: "title", params: { id: movie.imdbID } });
    },
    fetchEntriesDebounced(val) {
      // cancel pending call
      clearTimeout(this._timerId);

      // delay new call 500ms
      this._timerId = setTimeout(() => {
        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        Movie.search(val)
          .then((results) => {
            // this.count = results.totalResults;
            if (results.Search) {
              this.entries = results.Search.filter((result) => {
                return result.Poster !== "N/A" && result.Type !== "game";
              });
            } else {
              // this.entries = [];
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      }, 500);
    },
  },

  watch: {
    search(val) {
      if (val.length < 5) return;
      this.fetchEntriesDebounced(val);
    },
  },
};
</script>
