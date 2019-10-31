<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-btn icon v-on="on" :disabled="selectedMemo.id == null">
        <v-icon>delete</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>削除確認</v-card-title>
      <v-card-text>メモを削除しても良いですか?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="dialog = false">いいえ</v-btn>

        <v-btn text @click="dialog = false, deleteMemo()">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as types from "@/store/mutation-types";

export default {
  name: "GwnDeleteMemoMenuItem",

  data() {
    return {
      dialog: false
    };
  },

  computed: {
    selectedMemo() {
      return this.$store.getters.getSelectedMemo;
    }
  },

  methods: {
    deleteMemo() {
      this.$store.commit(types.DELETE_MEMO);
    }
  }
};
</script>

<style scoped>
</style>