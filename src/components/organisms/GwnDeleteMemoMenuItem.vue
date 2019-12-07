<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-btn icon @click.stop="on.click" :disabled="activatorDisabled" large class="mx-4">
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

  props: {
    memos: {
      type: Array
    },
    activatorDisabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialog: false
    };
  },

  methods: {
    deleteMemos() {
      this.$store.dispatch("deleteMemos", this.memos);
    }
  }
};
</script>

<style scoped>
</style>