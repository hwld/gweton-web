<template>
  <div>
    <GwnDeleteMemoMenuItem @deleteMemos="deleteMemo"></GwnDeleteMemoMenuItem>
    <GwnEditMemoMenuItem
      :authorNameList="authorNameList"
      :bookNameList="bookNameList"
      @editMemo="editMemo"
      :memo="memo"
    ></GwnEditMemoMenuItem>
  </div>
</template>

<script>
import GwnEditMemoMenuItem from "@/components/molecules/MenuItem/GwnEditMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/molecules/MenuItem/GwnDeleteMemoMenuItem.vue";

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

  computed: {
    authorNameList() {
      return this.$store.getters.getAuthorNameList;
    },
    bookNameList() {
      return this.$store.getters.getBookNameList;
    }
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