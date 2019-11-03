<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" :disabled="selectedGenre.id == null">
        <v-icon>post_add</v-icon>
      </v-btn>
    </template>

    <!--ダイアログの外側がクリックされたときにフィールドをリセットするために、空のメモオブジェクトを渡す。-->
    <!--外側がクリックされたら、メモオブジェクトを空文字でリセットし、反映させる。-->
    <GwnMemoEditCard
      :defaultMemo="memo"
      cardTitle="メモ作成"
      okButtonText="作成"
      @onOk="addMemo"
      @onCancel="cancel"
    ></GwnMemoEditCard>
  </v-dialog>
</template>

<script>
import * as types from "@/store/mutation-types.js";
import GwnMemoEditCard from "@/components/organisms/GwnMemoEditCard.vue";

export default {
  name: "GwnAddMemoMenuItem",

  components: {
    GwnMemoEditCard
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    }
  },

  data() {
    return {
      dialog: false,
      memo: { title: "", text: "", authorName: "", bookName: "" }
    };
  },

  methods: {
    addMemo(memo) {
      this.dialog = false;
      this.$store.commit(types.ADD_MEMO, memo);
      this.resetMemo();
    },
    cancel() {
      this.dialog = false;
      this.resetMemo();
    },
    resetMemo() {
      //defaultMemoとして渡すオブジェクトを空にすることで、フィールドをリセットする
      this.memo = { title: "", text: "", authorName: "", bookName: "" };
    }
  }
};
</script>

<style scoped>
</style>