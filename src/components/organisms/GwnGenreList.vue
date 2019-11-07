<template>
  <div>
    <GwnGenreListMenu></GwnGenreListMenu>

    <v-treeview
      :items="genres"
      activatable
      item-text="genreName"
      item-children="genres"
      @update:active="selectGenre"
      class="treeview overflow-y-auto"
      max-height="1"
    ></v-treeview>
  </div>
</template>

<script>
import * as types from "@/store/mutation-types";
import GwnGenreListMenu from "@/components/organisms/GwnGenreListMenu.vue";

export default {
  name: "GwnGenreList",

  components: {
    GwnGenreListMenu
  },

  data: () => ({
    active: []
  }),

  computed: {
    genres() {
      return this.$store.getters.getGenres;
    }
  },

  methods: {
    selectGenre(id) {
      if (id[0] != null) {
        const genre = this.$store.getters.getGenreById(id[0]);
        this.$store.commit(types.SELECT_GENRE, genre);
      } else {
        this.$store.commit(types.SELECT_GENRE, {});
      }
    }
  }
};
</script>

<style scoped>
.treeview {
  max-height: 86vh;
}
.v-treeview-node__content,
.v-treeview-node__label {
  word-break: break-all;
}
</style>