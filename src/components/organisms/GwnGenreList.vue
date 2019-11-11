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
    ></v-treeview>
  </div>
</template>

<script>
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
    selectGenre(selectId) {
      this.$store.dispatch("selectGenre", selectId[0]);
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