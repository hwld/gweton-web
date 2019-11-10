<template>
  <GwnMemoListBase :memos="filteredMemos">
    <template v-slot:menu>
      <GwnSearchResultMemoListMenu></GwnSearchResultMemoListMenu>
    </template>
  </GwnMemoListBase>
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
      return false;
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
        window.console.log("Hello");
        let arr = [];

        if (genre.id != null) {
          arr.push(genre);
        }

        this.setFilterTargetMemos(arr);
      }
    }
  }
};
</script>

<style scoped>
.memo-title {
  font-size: 1.5rem;
}

.memo-text {
  font-size: 1.2rem;
}

.memo-meta-data-head {
  font-size: 0.9rem;
  color: slategray;
}

.memo-meta-data {
  font-size: 0.9rem;
}
</style>