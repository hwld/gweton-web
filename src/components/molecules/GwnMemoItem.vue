<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="memo-title" v-html="title"></div>
      </v-col>
      <v-col cols="12">
        <div class="memo-text" v-html="text"></div>
      </v-col>
      <v-col cols="6">
        <div>
          <span class="memo-meta-data-head">書籍名:</span>
          <span class="memo-meta-data" v-html="bookName"></span>
        </div>
      </v-col>
      <v-col cols="6">
        <div>
          <span class="memo-meta-data-head">著者名:</span>
          <span class="memo-meta-data" v-html="authorName"></span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GwnMemoItem",

  props: {
    memo: {
      type: Object,
      default: () => {}
    },
    searchText: {
      type: String,
      default: null
    }
  },
  computed: {
    title() {
      return this.searchHighlightHTML(this.memo.title);
    },
    text() {
      return this.searchHighlightHTML(this.memo.text);
    },
    bookName() {
      return this.searchHighlightHTML(this.memo.bookName);
    },
    authorName() {
      return this.searchHighlightHTML(this.memo.authorName);
    }
  },
  methods: {
    searchHighlightHTML(text) {
      if (this.searchText) {
        const searchRegExp = new RegExp(this.searchText, "ig");
        return text.replace(
          searchRegExp,
          match => `<span class='find'>${match}</span>`
        );
      }
      return text;
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
  white-space: pre-wrap;
}

.memo-meta-data-head {
  font-size: 0.9rem;
  color: slategray;
}

.memo-meta-data {
  font-size: 0.9rem;
}

.memo-title >>> .find,
.memo-text >>> .find,
.memo-meta-data >>> .find {
  color: black;
  background-color: yellow;
}
</style>