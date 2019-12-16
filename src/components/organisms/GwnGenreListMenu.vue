<template>
  <div>
    <GwnAddGenreMenuItem @addGenre="addGenre" :activatorClasses="activatorClasses" :size="size"></GwnAddGenreMenuItem>

    <GwnDeleteGenreMenuItem
      @deleteGenre="deleteGenre"
      :activatorDisabled="selectedGenre.id == null"
      :activatorClasses="activatorClasses"
      :size="size"
    ></GwnDeleteGenreMenuItem>

    <GwnEditGenreMenuItem
      @editGenre="editGenre"
      :genre="selectedGenre"
      :activatorDisabled="selectedGenre.id == null"
      :activatorClasses="activatorClasses"
      :size="size"
    ></GwnEditGenreMenuItem>
  </div>
</template>

<script>
import GwnAddGenreMenuItem from "@/components/molecules/MenuItem/GwnAddGenreMenuItem.vue";
import GwnDeleteGenreMenuItem from "@/components/molecules/MenuItem/GwnDeleteGenreMenuItem.vue";
import GwnEditGenreMenuItem from "@/components/molecules/MenuItem/GwnEditGenreMenuItem.vue";

export default {
  name: "GwnGenreListMenu",

  components: {
    GwnAddGenreMenuItem,
    GwnDeleteGenreMenuItem,
    GwnEditGenreMenuItem
  },

  data() {
    return {
      activatorClasses: ["mx-4"],
      size: "large"
    };
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    }
  },

  methods: {
    addGenre(genre) {
      this.$store.dispatch("addGenre", {
        genre,
        parentGenreId: this.selectedGenre.id
      });
    },

    deleteGenre() {
      this.$store.dispatch("deleteGenreAndMemo", this.selectedGenre.id);
    },

    editGenre(genre) {
      this.$store.dispatch("editGenre", {
        genre,
        genreId: this.selectedGenre.id
      });
    }
  }
};
</script>

<style scoped>
</style>