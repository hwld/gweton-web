<template>
  <div>
    <GwnDeleteMemoMenuItem
      @deleteMemos="deleteMemos"
      :activatorDisabled="selectedMemos[0] == null"
      :activatorClasses="activatorClasses"
      :size="size"
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
      activatorClasses: ["mx-4"],
      size: "large"
    };
  },

  computed: {
    selectedMemos() {
      return this.$store.getters.getSelectedMemos;
    }
  },

  methods: {
    deleteMemos() {
      this.$store.dispatch("deleteMemos", this.selectedMemos);
    }
  }
};
</script>

<style scoped>
</style>