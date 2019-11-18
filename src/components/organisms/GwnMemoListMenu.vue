<template>
  <v-toolbar>
    <GwnAddMemoMenuItem></GwnAddMemoMenuItem>
    <GwnDeleteMemoMenuItem></GwnDeleteMemoMenuItem>
    <GwnMoveMemoMenuItem></GwnMoveMemoMenuItem>
  </v-toolbar>
</template>

<script>
import GwnAddMemoMenuItem from "@/components/organisms/GwnAddMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/organisms/GwnDeleteMemoMenuItem.vue";
import GwnMoveMemoMenuItem from "@/components/organisms/GwnMoveMemoMenuItem.vue";

export default {
  name: "GwnMemoListMenu",

  components: {
    GwnAddMemoMenuItem,
    GwnDeleteMemoMenuItem,
    GwnMoveMemoMenuItem
  }
};
</script>

<style scoped>
</style>