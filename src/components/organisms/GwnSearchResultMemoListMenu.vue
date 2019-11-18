<template>
  <v-toolbar>
    <GwnDeleteMemoMenuItem></GwnDeleteMemoMenuItem>
  </v-toolbar>
</template>

<script>
import GwnDeleteMemoMenuItem from "@/components/organisms/GwnDeleteMemoMenuItem.vue";

export default {
  name: "GwnSearchResultMemoListMenu",

  components: {
    GwnDeleteMemoMenuItem
  }
};
</script>

<style scoped>
</style>