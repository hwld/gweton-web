<template>
  <v-toolbar>
    <GwnAddMemoMenuItem></GwnAddMemoMenuItem>
    <GwnDeleteMemoMenuItem></GwnDeleteMemoMenuItem>
    <GwnEditMemoMenuItem></GwnEditMemoMenuItem>
  </v-toolbar>
</template>

<script>
import GwnAddMemoMenuItem from "@/components/organisms/GwnAddMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/organisms/GwnDeleteMemoMenuItem.vue";
import GwnEditMemoMenuItem from "@/components/organisms/GwnEditMemoMenuItem.vue";

export default {
  name: "GwnMemoListMenu",

  components: {
    GwnAddMemoMenuItem,
    GwnDeleteMemoMenuItem,
    GwnEditMemoMenuItem
  }
};
</script>

<style scoped>
</style>