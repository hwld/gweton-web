<template>
  <v-card>
    <v-card-title>{{"検索条件"}}</v-card-title>

    <v-card-text>
      <v-container>
        <v-row dense>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-label>ジャンル</v-label>

            <v-text-field dense :value="genreName" outlined readonly>
              <template v-slot:append-outer>
                <GwnSelectGenreDialog
                  :allGenre="allGenre"
                  @select="onSelectGenre"
                  :activatorDisabled="isSelectAllGenre === true"
                ></GwnSelectGenreDialog>
              </template>
            </v-text-field>

            <v-checkbox dense v-model="isSelectAllGenre" label="すべてのジャンル" color="blue"></v-checkbox>

            <v-radio-group row v-model="isSelectGenreOnly" :disabled="isSelectAllGenre === true">
              <v-radio :value="true" label="選択したジャンルのメモ" color="blue"></v-radio>
              <v-radio :value="false" label="選択したジャンル以下の全てのメモ" color="blue"></v-radio>
            </v-radio-group>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row dense>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="タイトル" v-model="title"></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row dense>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="メモ" v-model="text"></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row dense>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-combobox :items="bookNameList" label="書籍名" v-model="bookName"></v-combobox>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row dense>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-combobox :items="authorNameList" label="著者名" v-model="authorName"></v-combobox>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="onCancel">中止</v-btn>
      <v-btn text @click="onSearch" :disabled="searchButtonDisabled">検索</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GwnSelectGenreDialog from "@/components/molecules/GwnSelectGenreDialog.vue";

export default {
  components: {
    GwnSelectGenreDialog
  },

  props: {
    allGenre: {
      type: Array,
      default: () => []
    },
    defaultCriteria: {
      type: Object,
      default: () => ({
        genreId: "",
        isSelectAllGenre: false,
        isSelectGenreOnly: true,
        title: "",
        text: "",
        authorName: "",
        bookName: ""
      })
    },
    authorNameList: {
      type: Array,
      default: () => []
    },
    bookNameList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      genreId: this.defaultCriteria.genreId,
      isSelectAllGenre: this.defaultCriteria.isSelectAllGenre,
      isSelectGenreOnly: this.defaultCriteria.isSelectGenreOnly,
      title: this.defaultCriteria.title,
      text: this.defaultCriteria.text,
      authorName: this.defaultCriteria.authorName,
      bookName: this.defaultCriteria.bookName,

      genreName: ""
    };
  },

  computed: {
    searchButtonDisabled() {
      return this.isSelectAllGenre === false && this.genreId === "";
    }
  },

  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onSearch() {
      this.$emit("onSearch", {
        isSelectAllGenre: this.isSelectAllGenre,
        genreId: this.genreId,
        isSelectGenreOnly: this.isSelectGenreOnly,
        title: this.title,
        text: this.text,
        authorName: this.authorName,
        bookName: this.bookName
      });
    },
    onSelectGenre(genre) {
      if (genre != null) {
        this.genreId = genre.id;
        this.genreName = genre.genreName;
      }
    }
  }
};
</script>

<style scoped>
</style>