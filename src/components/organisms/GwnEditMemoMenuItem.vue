<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{on}">
      <v-btn icon @click.stop="on.click" x-large>
        <v-icon>edit</v-icon>
      </v-btn>
    </template>

    <GwnEditMemoCard
      v-if="dialog"
      :defaultMemo="memo"
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
      dialog: false
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
  }
};
</script>

<style scoped>
</style>