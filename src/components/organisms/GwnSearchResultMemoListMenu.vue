<template>
  <div>
    <GwnDeleteMemoMenuItem
      @deleteMemos="deleteMemos"
      :activatorDisabled="selectedMemos[0] == null"
      :activatorClass="activatorClass"
    ></GwnDeleteMemoMenuItem>
  </div>
</template>

<script>
import GwnDeleteMemoMenuItem from "@/components/molecules/MenuItem/GwnDeleteMemoMenuItem.vue";

export default {
  name: "GwnSearchResultMemoListMenu",

  components: {
    GwnDeleteMemoMenuItem
  },

  data() {
    return {
      activatorClass: "mx-4"
    };
  },

  computed: {
    selectedMemos() {
      return this.$store.getters.getSelectedMemos;
    }
  },

  deleteMemos() {
    this.$store.dispatch("deleteMemos", this.selectedMemos);
  }
};
</script>

<style scoped>
</style>