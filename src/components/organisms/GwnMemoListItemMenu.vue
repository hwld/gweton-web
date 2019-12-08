<template>
  <div>
    <GwnDeleteMemoMenuItem @deleteMemos="deleteMemo" :activatorClass="activatorClass"></GwnDeleteMemoMenuItem>
    <GwnEditMemoMenuItem @editMemo="editMemo" :memo="memo" :activatorClass="activatorClass"></GwnEditMemoMenuItem>
  </div>
</template>

<script>
import GwnEditMemoMenuItem from "@/components/molecules/GwnEditMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/molecules/GwnDeleteMemoMenuItem.vue";

export default {
  components: {
    GwnEditMemoMenuItem,
    GwnDeleteMemoMenuItem
  },
  props: {
    memo: {
      type: Object
    }
  },
  data() {
    return {
      activatorClass: "mx-4"
    };
  },
  methods: {
    deleteMemo() {
      this.$store.dispatch("deleteMemos", [this.memo]);
    },
    editMemo(newMemo) {
      this.$store.dispatch("editMemo", newMemo);
    }
  }
};
</script>