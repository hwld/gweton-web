<template>
  <div>
    <GwnAddMemoMenuItem
      @addMemo="addMemo"
      :authorNameList="authorNameList"
      :bookNameList="bookNameList"
      :activatorDisabled="selectedGenre.id == null"
      :activatorClass="activatorClass"
    ></GwnAddMemoMenuItem>

    <GwnDeleteMemoMenuItem
      @deleteMemos="deleteMemos"
      :activatorDisabled="selectedMemos[0] == null"
      :activatorClass="activatorClass"
    ></GwnDeleteMemoMenuItem>

    <GwnMoveMemoMenuItem
      @moveMemo="moveMemo"
      :activatorDisabled="selectedMemos[0] == null"
      :activatorClass="activatorClass"
    ></GwnMoveMemoMenuItem>

    <GwnSortMemoMenuItem @sortMemo="sortMemo" :activatorClass="activatorClass"></GwnSortMemoMenuItem>
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
      activatorClass: "mx-4"
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