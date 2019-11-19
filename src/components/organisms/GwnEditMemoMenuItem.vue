<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{on}">
      <v-btn icon @click.stop="on.click">
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
import GwnEditMemoCard from "@/components/organisms/GwnEditMemoCard.vue";

export default {
  name: "GwnEditMemoMenuItem",

  components: {
    GwnEditMemoCard
  },

  props: {
    memo: {
      type: Object
    }
  },

  data() {
    return {
      dialog: false,
      defaultMemo: {}
    };
  },

  methods: {
    editMemo(newMemo) {
      this.dialog = false;
      this.$store.dispatch("editMemo", newMemo);
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
            id: this.memo.id,
            genreId: this.memo.genreId,
            title: this.memo.title,
            text: this.memo.text,
            authorName: this.memo.authorName,
            bookName: this.memo.bookName
          };
        }
      }
    }
  }
};
</script>

<style scoped>
</style>