<template>
  <div>
    <GwnGenreListMenu></GwnGenreListMenu>

    <GwnGenreListBase @selectGenre="selectGenre" class="treeview"></GwnGenreListBase>
  </div>
</template>

<script>
import GwnGenreListMenu from "@/components/organisms/GwnGenreListMenu.vue";
import GwnGenreListBase from "@/components/organisms/GwnGenreListBase.vue";

export default {
  name: "GwnGenreList",

  components: {
    GwnGenreListMenu,
    GwnGenreListBase
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