<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" :disabled="selectedGenre.id == null" x-large class="mx-10">
        <v-icon>post_add</v-icon>
      </v-btn>
    </template>

    <!--ダイアログの外側がクリックされたときにフィールドをリセットするために、空のメモオブジェクトを渡す。-->
    <!--外側がクリックされたら、メモオブジェクトを空文字でリセットし、反映させる。-->
    <GwnEditMemoCard
      v-if="dialog"
      cardTitle="メモ作成"
      okButtonText="作成"
      @onOk="addMemo"
      @onCancel="cancel"
    ></GwnEditMemoCard>
  </v-dialog>
</template>

<script>
import GwnEditMemoCard from "@/components/organisms/GwnEditMemoCard.vue";

export default {
  name: "GwnAddMemoMenuItem",

  components: {
    GwnEditMemoCard
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    }
  },

  data() {
    return {
      dialog: false
    };
  },

  methods: {
    addMemo(memo) {
      this.dialog = false;
      this.$store.dispatch("addMemo", {
        memo,
        genreId: this.selectedGenre.id
      });
    },
    cancel() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
</style>