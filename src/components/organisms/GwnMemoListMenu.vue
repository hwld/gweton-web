<template>
  <v-toolbar>
    <GwnAddMemoMenuItem></GwnAddMemoMenuItem>
    <GwnDeleteMemoMenuItem></GwnDeleteMemoMenuItem>
  </v-toolbar>
</template>

<script>
import GwnAddMemoMenuItem from "@/components/organisms/GwnAddMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/organisms/GwnDeleteMemoMenuItem.vue";

export default {
  name: "GwnMemoListMenu",

  components: {
    GwnAddMemoMenuItem,
    GwnDeleteMemoMenuItem
  }
};
</script>

<style scoped>
</style>