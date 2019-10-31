<template>
  <v-card>
    <v-card-title>{{cardTitle}}</v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="タイトル" v-model="memo.title" filled></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-textarea label="メモ*" v-model="memo.text" filled :rules="rules"></v-textarea>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="書籍名" v-model="memo.authorName" filled></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="著者名" v-model="memo.bookName" filled></v-text-field>
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
      <v-btn text @click="onCancel">CANCEL</v-btn>
      <v-btn text @click="onOk" :disabled="memo.text == ''">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GwnMemoEditCard",
  props: {
    memo: {
      type: Object,
      default: () => ({})
    },
    cardTitle: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      rules: [v => !!v || "入力してください"]
    };
  },

  methods: {
    clearField() {
      this.memo.title = this.memo.text = this.memo.authorName = this.memo.bookName =
        "";
    },
    onCancel() {
      this.$emit("onCancel");
      this.clearField();
    },
    onOk() {
      this.$emit("onOk", {
        title: this.memo.title,
        text: this.memo.text,
        authorName: this.memo.authorName,
        bookName: this.memo.bookName
      });
      this.clearField();
    }
  }
};
</script>

<style scoped>
</style>