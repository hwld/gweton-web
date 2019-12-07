<template>
  <div>
    <GwnDeleteMemoMenuItem :memos="[memo]"></GwnDeleteMemoMenuItem>
    <GwnEditMemoMenuItem :memo="memo"></GwnEditMemoMenuItem>
  </div>
</template>

<script>
import GwnEditMemoMenuItem from "@/components/organisms/GwnEditMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/organisms/GwnDeleteMemoMenuItem.vue";

export default {
  components: {
    GwnEditMemoMenuItem,
    GwnDeleteMemoMenuItem
  },
  props: {
    memo: {
      type: Object
    }
  }
};
</script>