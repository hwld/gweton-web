<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" :disabled="selectedGenre.id == null">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>

    <GwnEditGenreCard
      :defaultGenre="defaultGenre"
      cardTitle="メモ編集"
      okButtonText="変更"
      @onOk="editGenre"
      @onCancel="cancel"
    ></GwnEditGenreCard>
  </v-dialog>
</template>

<script>
import GwnEditGenreCard from "@/components/organisms/GwnEditGenreCard.vue";

export default {
  name: "GwnEditGenreMenuItem",

  components: {
    GwnEditGenreCard
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    }
  },

  data() {
    return {
      dialog: false,
      defaultGenre: {}
    };
  },

  methods: {
    editGenre(genre) {
      this.dialog = false;
      this.$store.dispatch("editGenre", {
        genre,
        genreId: this.selectedGenre.id
      });
    },
    cancel() {
      this.dialog = false;
    }
  },

  watch: {
    dialog: {
      immediate: true,
      handler(value) {
        if (value == true) {
          this.defaultGenre = {
            genreName: this.selectedGenre.genreName
          };
        }
      }
    }
  }
};
</script>

<style scoped>
</style>