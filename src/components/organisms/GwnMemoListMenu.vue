<template>
  <div>
    <GwnAddMemoMenuItem
      @addMemo="addMemo"
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
  </div>
</template>

<script>
import GwnAddMemoMenuItem from "@/components/molecules/GwnAddMemoMenuItem.vue";
import GwnDeleteMemoMenuItem from "@/components/molecules/GwnDeleteMemoMenuItem.vue";
import GwnMoveMemoMenuItem from "@/components/molecules/GwnMoveMemoMenuItem.vue";

export default {
  name: "GwnMemoListMenu",

  components: {
    GwnAddMemoMenuItem,
    GwnDeleteMemoMenuItem,
    GwnMoveMemoMenuItem
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
    }
  }
};
</script>

<style scoped>
</style>