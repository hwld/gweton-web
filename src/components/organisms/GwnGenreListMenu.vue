<template>
  <v-toolbar>
    <GwnAddGenreMenuItem></GwnAddGenreMenuItem>
    <GwnDeleteGenreMenuItem></GwnDeleteGenreMenuItem>
    <GwnUpdateGenreMenuItem></GwnUpdateGenreMenuItem>
  </v-toolbar>
</template>

<script>
import GwnAddGenreMenuItem from "@/components/organisms/GwnAddGenreMenuItem.vue";
import GwnDeleteGenreMenuItem from "@/components/organisms/GwnDeleteGenreMenuItem.vue";
import GwnUpdateGenreMenuItem from "@/components/organisms/GwnUpdateGenreMenuItem.vue";

export default {
  name: "GwnGenreListMenu",

  components: {
    GwnAddGenreMenuItem,
    GwnDeleteGenreMenuItem,
    GwnUpdateGenreMenuItem
  }
};
</script>

<style scoped>
</style>