<template>
  <v-card>
    <v-card-title>{{cardTitle}}</v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-text-field label="ジャンル名" v-model="genreName" filled :rules="rules"></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="onCancel">中止</v-btn>
      <v-btn text @click="onOk" :disabled="genreName === ''">完了</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GwnEditGenreCard",
  props: {
    defaultGenre: {
      type: Object,
      default: () => ({ genreName: "" })
    },
    cardTitle: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      rules: [v => !!v || "入力してください"],
      genreName: this.defaultGenre.genreName
    };
  },

  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onOk() {
      this.$emit("onOk", {
        genreName: this.genreName
      });
    }
  }
};
</script>

<style scoped>
</style>