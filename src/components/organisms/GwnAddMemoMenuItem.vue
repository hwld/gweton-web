<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="clearField">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" :disabled="selectedGenre == null">
        <v-icon>post_add</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>メモの作成</v-card-title>

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
        <v-btn text @click="dialog = false, clearField()">キャンセル</v-btn>
        <v-btn text @click="dialog = false, addMemo()" :disabled="text==''">作成</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as types from "@/store/mutation-types.js";

export default {
  name: "GwnAddMemoMenuItem",

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    }
  },

  data() {
    return {
      dialog: false,
      title: "",
      text: "",
      authorName: "",
      bookName: "",
      rules: [v => !!v || "入力してください"]
    };
  },

  methods: {
    addMemo() {
      this.$store.commit(types.ADD_MEMO, {
        title: this.title,
        text: this.text,
        authorName: this.authorName,
        bookName: this.bookName
      });

      this.clearField();
    },
    clearField() {
      this.title = this.text = this.authorName = this.bookName = "";
    }
  }
};
</script>

<style scoped>
</style>