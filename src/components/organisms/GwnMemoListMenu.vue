<template>
  <v-toolbar max-height="10vh">
    <GwnAddMemoMenuItem></GwnAddMemoMenuItem>
    <GwnDeleteMemoMenuItem></GwnDeleteMemoMenuItem>
    <GwnUpdateMemoMenuItem></GwnUpdateMemoMenuItem>
  </v-toolbar>
</template>

<script>
import GwnAddMemoMenuItem from "@/components/organisms/GwnAddMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/organisms/GwnDeleteMemoMenuItem.vue";
import GwnUpdateMemoMenuItem from "@/components/organisms/GwnUpdateMemoMenuItem.vue";

export default {
  name: "GwnMemoListMenu",

  components: {
    GwnAddMemoMenuItem,
    GwnDeleteMemoMenuItem,
    GwnUpdateMemoMenuItem
  }
};
</script>

<style scoped>
</style>