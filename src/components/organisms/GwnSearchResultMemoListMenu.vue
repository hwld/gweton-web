<template>
  <div>
    <GwnDeleteMemoMenuItem
      @deleteMemos="deleteMemos"
      :activatorDisabled="selectedMemos[0] == null"
      :activatorClasses="activatorClasses"
      :size="size"
    ></GwnDeleteMemoMenuItem>

    <GwnCloseMenuItem @close="close" :activatorClasses="activatorClasses" :size="size"></GwnCloseMenuItem>
  </div>
</template>

<script>
import GwnDeleteMemoMenuItem from "@/components/molecules/MenuItem/GwnDeleteMemoMenuItem.vue";
import GwnCloseMenuItem from "@/components/molecules/MenuItem/GwnCloseMenuItem.vue";

export default {
  name: "GwnSearchResultMemoListMenu",

  components: {
    GwnDeleteMemoMenuItem,
    GwnCloseMenuItem
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
    },
    close() {
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
</style>