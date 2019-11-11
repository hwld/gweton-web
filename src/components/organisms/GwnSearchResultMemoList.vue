<template>
  <div>
    <GwnSearchResultMemoListMenu></GwnSearchResultMemoListMenu>
    <GwnMemoListBase :memos="filteredMemos"></GwnMemoListBase>
  </div>
</template>

<script>
import GwnMemoListBase from "@/components/organisms/GwnMemoListBase.vue";
import GwnSearchResultMemoListMenu from "@/components/organisms/GwnSearchResultMemoListMenu.vue";

export default {
  name: "GwnSearchResultMemoList",

  components: {
    GwnMemoListBase,
    GwnSearchResultMemoListMenu
  },

  data() {
    return {
      filterTargetMemos: []
    };
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    },

    filterText() {
      return this.$store.getters.getFilterText;
    },

    filteredMemos() {
      const text = this.filterText;
      if (text == "") return [];

      return this.filterTargetMemos.filter(memo => {
        if (
          memo.title.includes(text) ||
          memo.text.includes(text) ||
          memo.authorName.includes(text) ||
          memo.bookName.includes(text)
        ) {
          return memo;
        }
      });
    }
  },

  methods: {
    selectMemo(id) {
      this.$store.dispatch("selectMemo", id);
    },

    setFilterTargetMemos(genres) {
      for (const genre of genres) {
        this.filterTargetMemos.push(...genre.memos);
        this.setFilterTargetMemos(genre.genres);
      }
    }
  },

  watch: {
    selectedGenre: {
      immediate: true,
      handler(genre) {
        let arr = [];

        if (genre.id != null) {
          arr.push(genre);
        } else {
          arr.push(...this.$store.getters.getGenres);
        }
        this.filterTargetMemos = [];
        this.setFilterTargetMemos(arr);
      }
    }
  }
};
</script>

<style scoped>
</style>