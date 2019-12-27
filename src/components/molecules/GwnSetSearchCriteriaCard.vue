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
            <v-autocomplete :items="bookNameList" label="書籍名" v-model="bookName"></v-autocomplete>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row dense>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-autocomplete :items="authorNameList" label="著者名" v-model="authorName"></v-autocomplete>
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
        genreName: "",
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
      genreId: "",
      genreName: "",
      isSelectAllGenre: false,
      isSelectGenreOnly: true,
      title: "",
      text: "",
      authorName: "",
      bookName: ""
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
      let criteria = {
        title: this.title,
        text: this.text,
        authorName: this.authorName,
        bookName: this.bookName
      };

      if (this.isSelectAllGenre) {
        criteria.isSelectAllGenre = true;
      } else {
        criteria.genreId = this.genreId;
        criteria.isSelectGenreOnly = this.isSelectGenreOnly;
        criteria.genreName = this.genreName;
      }

      this.$emit("onSearch", criteria);
    },
    onSelectGenre(genre) {
      if (genre != null) {
        this.genreId = genre.id;
        this.genreName = genre.genreName;
      }
    }
  },

  watch: {
    defaultCriteria: function(criteria) {
      this.genreId = criteria.genreId;
      this.isSelectAllGenre = criteria.isSelectAllGenre;
      this.isSelectGenreOnly = criteria.isSelectGenreOnly;
      this.title = criteria.title;
      this.text = criteria.text;
      this.authorName = criteria.authorName;
      this.bookName = criteria.bookName;

      this.genreName = criteria.genreName;
    }
  }
};
</script>

<style scoped>
</style>