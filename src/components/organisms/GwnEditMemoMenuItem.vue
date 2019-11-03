<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" :disabled="selectedMemo.id == null">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>

    <GwnEditMemoCard
      :defaultMemo="defaultMemo"
      cardTitle="メモ編集"
      okButtonText="変更"
      @onOk="editMemo"
      @onCancel="cancel"
    ></GwnEditMemoCard>
  </v-dialog>
</template>

<script>
import * as types from "@/store/mutation-types.js";
import GwnEditMemoCard from "@/components/organisms/GwnEditMemoCard.vue";

export default {
  name: "GwnEditMemoMenuItem",

  components: {
    GwnEditMemoCard
  },

  computed: {
    selectedMemo() {
      return this.$store.getters.getSelectedMemo;
    }
  },

  data() {
    return {
      dialog: false,
      defaultMemo: {}
    };
  },

  methods: {
    editMemo(memo) {
      this.dialog = false;
      this.$store.commit(types.EDIT_MEMO, memo);
    },
    cancel() {
      this.dialog = false;
    }
  },

  watch: {
    dialog: {
      immediate: true,
      handler(value) {
        if (value == true) {
          this.defaultMemo = {
            title: this.selectedMemo.title,
            text: this.selectedMemo.text,
            authorName: this.selectedMemo.authorName,
            bookName: this.selectedMemo.bookName
          };
        }
      }
    }
  }
};
</script>

<style scoped>
</style>