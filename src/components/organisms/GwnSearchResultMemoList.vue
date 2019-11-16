<template>
  <div>
    <GwnSearchResultMemoListMenu></GwnSearchResultMemoListMenu>
    <GwnMemoListBase :memos="searchResultMemos"></GwnMemoListBase>
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

  computed: {
    genres() {
      return this.$store.getters.getGenres;
    },

    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    },

    filterText() {
      return this.$store.getters.getFilterText;
    },

    getGenreList() {
      return this.$store.getters.getGenreList;
    },

    searchTargetGenresId() {
      let searchTargetGenresId = [];

      //ジャンルが選択されてなければすべてのジャンルIDを対象にする
      if (this.selectedGenre.id == null) {
        this.getGenreList.forEach(genre => {
          searchTargetGenresId.push(genre.id);
        });
      } else {
        searchTargetGenresId.push(this.selectedGenre.id);
        this.setSearchTargetGenresId(this.selectedGenre, searchTargetGenresId);
      }

      return searchTargetGenresId;
    },

    searchTargetMemos() {
      let searchTargetMemos = [];
      this.searchTargetGenresId.forEach(genreId => {
        const memos = this.getMemosByGenreId(genreId);
        searchTargetMemos.push(...memos);
      });
      return searchTargetMemos;
    },

    searchResultMemos() {
      window.console.log("searchResultMemos");
      const text = this.filterText;
      if (text == "") return [];

      return this.searchTargetMemos.filter(memo => {
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
    getGenresByParentId(parentId) {
      return this.$store.getters.getGenresByParentId(parentId);
    },

    getGenreById(genreId) {
      return this.$store.getters.getGenreById(genreId);
    },

    getMemosByGenreId(genreId) {
      return this.$store.getters.getMemosByGenreId(genreId);
    },

    selectMemo(id) {
      this.$store.dispatch("selectMemo", id);
    },
    setSearchTargetGenresId(genre, searchTargetGenresId) {
      searchTargetGenresId.push(...genre.childrenId);

      for (const childGenreId of genre.childrenId) {
        let childGenre = this.getGenreById(childGenreId);
        this.setSearchTargetGenresId(childGenre, searchTargetGenresId);
      }
    }
  }
};
</script>

<style scoped>
</style>