<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-btn icon v-on="on" :disabled="selectedGenre.id == null">
        <v-icon>delete</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>削除確認</v-card-title>
      <v-card-text>ジャンルを削除しても良いですか?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="dialog = false">いいえ</v-btn>

        <v-btn text @click="dialog = false, deleteGenre()">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as types from "@/store/mutation-types";

export default {
  name: "GwnDeleteGenreMenuItem",

  data() {
    return {
      dialog: false
    };
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    },
    genres() {
      return this.$store.getters.getGenres;
    }
  },

  methods: {
    deleteGenre() {
      let parentGenre = this.findGenreById(
        this.genres,
        this.selectedGenre.parentId
      );
      this.$store.commit(types.DELETE_GENRE, parentGenre);
    },

    findGenreById(genres, searchId) {
      for (const genre of genres) {
        if (genre.id === searchId) {
          return genre;
        }
        if (genre.genres != null) {
          let result = this.findGenreById(genre.genres, searchId);
          if (result != null) {
            return result;
          }
        }
      }
    }
  }
};
</script>

<style scoped>
</style>