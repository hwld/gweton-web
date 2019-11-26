<template>
  <div>
    <GwnAddGenreMenuItem></GwnAddGenreMenuItem>
    <GwnDeleteGenreMenuItem></GwnDeleteGenreMenuItem>
    <GwnEditGenreMenuItem></GwnEditGenreMenuItem>
  </div>
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