<template>
  <div>
    <v-toolbar>
      <GwnGenreListMenu></GwnGenreListMenu>
    </v-toolbar>

    <GwnGenreListBase @selectGenre="selectGenre" class="treeview"></GwnGenreListBase>
  </div>
</template>

<script>
import GwnGenreListBase from "@/components/organisms/GwnGenreListBase.vue";
import GwnGenreListMenu from "@/components/organisms/GwnGenreListMenu.vue";

export default {
  name: "GwnGenreList",

  components: {
    GwnGenreListBase,
    GwnGenreListMenu
  },

  methods: {
    selectGenre(selectId) {
      this.$store.dispatch("selectGenre", selectId);
    }
  }
};
</script>

<style scoped>
.treeview {
  max-height: 86vh;
}
</style>