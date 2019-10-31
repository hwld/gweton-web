<template>
  <v-toolbar>
    <GwnAddGenreMenuItem></GwnAddGenreMenuItem>
    <GwnDeleteGenreMenuItem></GwnDeleteGenreMenuItem>
    <GwnEditGenreMenuItem></GwnEditGenreMenuItem>
  </v-toolbar>
</template>

<script>
import GwnAddGenreMenuItem from "@/components/organisms/GwnAddGenreMenuItem.vue";
import GwnDeleteGenreMenuItem from "@/components/organisms/GwnDeleteGenreMenuItem.vue";
import GwnEditGenreMenuItem from "@/components/organisms/GwnEditGenreMenuItem.vue";

export default {
  name: "GwnGenreListMenu",

  components: {
    GwnAddGenreMenuItem,
    GwnDeleteGenreMenuItem,
    GwnEditGenreMenuItem
  }
};
</script>

<style scoped>
</style>