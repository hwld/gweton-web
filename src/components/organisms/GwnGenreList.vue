<template>
  <div>
    <GwnGenreListMenu></GwnGenreListMenu>

    <GwnGenreListBase @selectGenre="selectGenre"></GwnGenreListBase>
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