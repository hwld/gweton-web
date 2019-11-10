<template>
  <v-toolbar>
    <GwnDeleteMemoMenuItem></GwnDeleteMemoMenuItem>
    <GwnEditMemoMenuItem></GwnEditMemoMenuItem>
  </v-toolbar>
</template>

<script>
import GwnDeleteMemoMenuItem from "@/components/organisms/GwnDeleteMemoMenuItem.vue";
import GwnEditMemoMenuItem from "@/components/organisms/GwnEditMemoMenuItem.vue";

export default {
  name: "GwnSearchResultMemoListMenu",

  components: {
    GwnDeleteMemoMenuItem,
    GwnEditMemoMenuItem
  }
};
</script>

<style scoped>
</style>