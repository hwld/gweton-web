<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" :disabled="selectedMemo.id == null">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>

    <!--ダイアログの外側がクリックされたときにフィールドをリセットするために、空のメモオブジェクトを渡す。-->
    <!--外側がクリックされたら、メモオブジェクトを空文字でリセットし、反映させる。-->
    <GwnMemoEditCard
      :defaultMemo="selectedMemo"
      cardTitle="メモ編集"
      @onOk="editMemo"
      @onCancel="cancel"
    ></GwnMemoEditCard>
  </v-dialog>
</template>

<script>
import * as types from "@/store/mutation-types.js";
import GwnMemoEditCard from "@/components/organisms/GwnMemoEditCard.vue";

export default {
  name: "GwnEditMemoMenuItem",

  components: {
    GwnMemoEditCard
  },

  computed: {
    selectedMemo() {
      return this.$store.getters.getSelectedMemo;
    }
  },

  data() {
    return {
      dialog: false
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
  }
};
</script>

<style scoped>
</style>