<template>
  <div>
    <v-card v-if="searchResultMemos[0] == null">
      <v-card-text>メモが見つかりませんでした</v-card-text>
    </v-card>
    <GwnMemoListBase v-else :memos="searchResultMemos"></GwnMemoListBase>
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
    getGenreList() {
      return this.$store.getters.getGenreList;
    },

    //検索対象のジャンルid
    searchTargetGenresId() {
      let searchTargetGenresId = [];

      if (this.searchCriteria.isSelectAllGenre) {
        //すべてのジャンルを対象に

        this.getGenreList.forEach(genre => {
          searchTargetGenresId.push(genre.id);
        });
      } else {
        //選択されたジャンルを対象に
        searchTargetGenresId.push(this.searchCriteria.genreId);

        //選択されたジャンルに含まれるすべてのジャンルも対象に
        if (!this.searchCriteria.isSelectGenreOnly) {
          this.setSearchTargetGenresId(
            this.getGenreById(this.searchCriteria.genreId),
            searchTargetGenresId
          );
        }
      }

      return searchTargetGenresId;
    },

    //検索対象のメモ
    searchTargetMemos() {
      let searchTargetMemos = [];
      this.searchTargetGenresId.forEach(genreId => {
        const memos = this.getMemosByGenreId(genreId);
        searchTargetMemos.push(...memos);
      });
      return searchTargetMemos;
    },

    //検索条件に一致するメモ
    searchResultMemos() {
      const hoge = this.searchTargetMemos.filter(memo => {
        if (this.matchCriteria(memo)) {
          return memo;
        }
      });
      return hoge;
    }
  },

  methods: {
    getGenreById(genreId) {
      return this.$store.getters.getGenreById(genreId);
    },

    getMemosByGenreId(genreId) {
      return this.$store.getters.getMemosByGenreId(genreId);
    },

    setSearchTargetGenresId(genre, searchTargetGenresId) {
      if (!genre) return;
      searchTargetGenresId.push(...genre.childrenId);

      for (const childGenreId of genre.childrenId) {
        let childGenre = this.getGenreById(childGenreId);
        this.setSearchTargetGenresId(childGenre, searchTargetGenresId);
      }
    },

    matchCriteria(memo) {
      const cAuthorName = this.searchCriteria.authorName;
      const cBookName = this.searchCriteria.bookName;

      const cTitle = this.searchCriteria.title;
      const memoTitle = memo.title;

      const cText = this.searchCriteria.text;
      const memoText = memo.text;

      const bool =
        (!cAuthorName || memo.authorName === cAuthorName) &&
        (!cBookName || memo.bookName === cBookName) &&
        (!cTitle || memoTitle.toUpperCase().includes(cTitle.toUpperCase())) &&
        (!cText || memoText.toUpperCase().includes(cText.toUpperCase()));

      window.console.log(memo);
      window.console.log(!cAuthorName || memo.authorName === cAuthorName);
      window.console.log(!cBookName || memo.authorName === cBookName);
      window.console.log(
        !cTitle || memoTitle.toUpperCase().includes(cTitle.toUpperCase())
      );
      window.console.log(
        !cText || memoText.toUpperCase().includes(cText.toUpperCase())
      );
      return bool;
    }
  }
};
</script>

<style scoped>
</style>