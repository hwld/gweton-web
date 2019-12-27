<template>
  <div>
    <v-card v-if="searchResultMemos[0] == null">
      <v-card-text>メモが見つかりませんでした</v-card-text>
    </v-card>
    <GwnMemoListBase v-else :searchText="filterText" :memos="searchResultMemos"></GwnMemoListBase>
    <v-footer padless fixed>
      <v-card width="100%" flat tile class="text-center">
        <v-card-text>
          <GwnSearchResultMemoListMenu></GwnSearchResultMemoListMenu>
        </v-card-text>
      </v-card>
    </v-footer>
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

  props: {
    searchCriteria: {
      type: Object,
      required: true
    }
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
      const text = this.filterText.toUpperCase();
      if (text == "") return [];
      return this.searchTargetMemos.filter(memo => {
        if (
          memo.title.toUpperCase().includes(text) ||
          memo.text.toUpperCase().includes(text) ||
          memo.authorName.toUpperCase().includes(text) ||
          memo.bookName.toUpperCase().includes(text)
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