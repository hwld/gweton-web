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
      <v-btn text @click="onCancel">CANCEL</v-btn>
      <v-btn text @click="onOk" :disabled="text === ''">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GwnMemoEditCard",
  props: {
    defaultMemo: {
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
      rules: [v => !!v || "入力してください"],
      title: "",
      text: "",
      authorName: "",
      bookName: ""
    };
  },

  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onOk() {
      this.$emit("onOk", {
        title: this.defaultMemo.title,
        text: this.defaultMemo.text,
        authorName: this.defaultMemo.authorName,
        bookName: this.defaultMemo.bookName
      });
    }
  },

  watch: {
    defaultMemo: {
      immediate: true,
      handler(memo) {
        this.title = memo.title;
        this.text = memo.text;
        this.authorName = memo.authorName;
        this.bookName = memo.bookName;
      }
    }
  }
};
</script>

<style scoped>
</style>