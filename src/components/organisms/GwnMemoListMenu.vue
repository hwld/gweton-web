<template>
  <v-toolbar max-height="10vh">
    <GwnAddMemoMenuItem @addMemo="addMemo" :selectedGenre="selectedGenre"></GwnAddMemoMenuItem>
    <GwnDeleteMemoMenuItem @deleteMemo="deleteMemo" :selectedMemoId="selectedMemoId"></GwnDeleteMemoMenuItem>
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
  },

  props: {
    selectedGenre: {
      type: Object,
      default: () => {}
    },
    selectedMemoId: {
      type: Number,
      default: 0
    }
  },

  methods: {
    addMemo(memo) {
      this.$emit("addMemo", memo);
    },
    deleteMemo() {
      this.$emit("deleteMemo");
    }
  }
};
</script>

<style scoped>
</style>