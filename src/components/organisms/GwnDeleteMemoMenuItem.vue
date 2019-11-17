<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-btn icon v-on="on" :disabled="selectedMemos[0] == null">
        <v-icon>delete</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>削除確認</v-card-title>
      <v-card-text>メモを削除しても良いですか?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="dialog = false">いいえ</v-btn>

        <v-btn text @click="dialog = false, deleteMemos()">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GwnDeleteMemoMenuItem",

  data() {
    return {
      dialog: false
    };
  },

  computed: {
    selectedMemos() {
      return this.$store.getters.getSelectedMemos;
    }
  },

  methods: {
    deleteMemos() {
      this.$store.dispatch("deleteMemos", this.selectedMemos);
      this.$store.dispatch("selectMemos", []);
    }
  }
};
</script>

<style scoped>
</style>