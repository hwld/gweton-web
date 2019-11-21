<template>
  <v-card>
    <v-card-title>{{cardTitle}}</v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="タイトル" v-model="title" filled></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-textarea label="メモ*" v-model="text" filled :rules="rules"></v-textarea>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="書籍名" v-model="authorName" filled></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="著者名" v-model="bookName" filled></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <label>*は必須項目です</label>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="onCancel">中止</v-btn>
      <v-btn text @click="onOk" :disabled="text === ''">{{okButtonText}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GwnEditMemoCard",
  props: {
    defaultMemo: {
      type: Object,
      default: () => ({
        id: null,
        genreId: null,
        title: "",
        text: "",
        authorName: "",
        bookName: ""
      })
    },
    cardTitle: {
      type: String,
      default: ""
    },
    okButtonText: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      rules: [v => !!v || "入力してください"],
      id: this.defaultMemo.id,
      genreId: this.defaultMemo.genreId,
      title: this.defaultMemo.title,
      text: this.defaultMemo.text,
      authorName: this.defaultMemo.authorName,
      bookName: this.defaultMemo.bookName
    };
  },

  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onOk() {
      this.$emit("onOk", {
        id: this.id,
        genreId: this.genreId,
        title: this.title,
        text: this.text,
        authorName: this.authorName,
        bookName: this.bookName
      });
    }
  }
};
</script>

<style scoped>
</style>