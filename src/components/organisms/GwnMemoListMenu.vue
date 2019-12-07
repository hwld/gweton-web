<template>
  <div>
    <GwnAddMemoMenuItem></GwnAddMemoMenuItem>
    <GwnDeleteMemoMenuItem :memos="selectedMemos" :activatorDisabled="selectedMemos[0] == null"></GwnDeleteMemoMenuItem>
    <GwnMoveMemoMenuItem></GwnMoveMemoMenuItem>
  </div>
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
  },

  computed: {
    selectedMemos() {
      return this.$store.getters.getSelectedMemos;
    }
  }
};
</script>

<style scoped>
</style>