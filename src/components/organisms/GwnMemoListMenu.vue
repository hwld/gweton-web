<template>
  <div>
    <GwnAddMemoMenuItem
      @addMemo="addMemo"
      :authorNameList="authorNameList"
      :bookNameList="bookNameList"
      :activatorDisabled="selectedGenre.id == null"
      :activatorClasses="activatorClasses"
      :size="size"
    ></GwnAddMemoMenuItem>

    <GwnDeleteMemoMenuItem
      @deleteMemos="deleteMemos"
      :activatorDisabled="selectedMemos[0] == null"
      :activatorClasses="activatorClasses"
      :size="size"
    ></GwnDeleteMemoMenuItem>

    <GwnMoveMemoMenuItem
      @moveMemo="moveMemo"
      :activatorDisabled="selectedMemos[0] == null"
      :activatorClasses="activatorClasses"
      :size="size"
    ></GwnMoveMemoMenuItem>

    <GwnSortMemoMenuItem @sortMemo="sortMemo" :activatorClasses="activatorClasses" :size="size"></GwnSortMemoMenuItem>
  </div>
</template>

<script>
import GwnAddMemoMenuItem from "@/components/molecules/MenuItem/GwnAddMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/molecules/MenuItem/GwnDeleteMemoMenuItem.vue";
import GwnMoveMemoMenuItem from "@/components/molecules/MenuItem/GwnMoveMemoMenuItem.vue";

import GwnSortMemoMenuItem from "@/components/molecules/MenuItem/GwnSortMemoMenuItem.vue";

export default {
  name: "GwnMemoListMenu",

  components: {
    GwnAddMemoMenuItem,
    GwnDeleteMemoMenuItem,
    GwnMoveMemoMenuItem,
    GwnSortMemoMenuItem
  },

  data() {
    return {
      activatorClasses: ["mx-4"],
      size: "large"
    };
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    },
    selectedMemos() {
      return this.$store.getters.getSelectedMemos;
    },
    authorNameList() {
      return this.$store.getters.getAuthorNameList;
    },
    bookNameList() {
      return this.$store.getters.getBookNameList;
    }
  },

  methods: {
    addMemo(memo) {
      this.$store.dispatch("addMemo", {
        memo,
        genreId: this.selectedGenre.id
      });
    },

    deleteMemos() {
      this.$store.dispatch("deleteMemos", this.selectedMemos);
    },

    moveMemo(toGenreId) {
      this.selectedMemos.forEach(memo => {
        memo.genreId = toGenreId;
        this.$store.dispatch("editMemo", memo);
      });
    },

    sortMemo(sortMemoInfo) {
      this.$emit("sortMemo", sortMemoInfo);
    }
  }
};
</script>

<style scoped>
</style>