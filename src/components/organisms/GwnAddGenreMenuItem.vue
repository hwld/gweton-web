<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" large class="mx-4">
        <v-icon>playlist_add</v-icon>
      </v-btn>
    </template>

    <GwnEditGenreCard v-if="dialog" cardTitle="ジャンル作成" @onOk="addGenre" @onCancel="dialog = false"></GwnEditGenreCard>
  </v-dialog>
</template>

<script>
import GwnEditGenreCard from "@/components/organisms/GwnEditGenreCard.vue";

export default {
  name: "GwnAddGenreMenuItem",

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
      dialog: false
    };
  },

  methods: {
    addGenre(genre) {
      this.dialog = false;
      this.$store.dispatch("addGenre", {
        genre: genre,
        parentGenreId: this.selectedGenre.id
      });
    }
  }
};
</script>

<style scoped>
</style>