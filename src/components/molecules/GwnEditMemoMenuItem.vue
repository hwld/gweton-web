<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-btn icon @click.stop="on.click" large :class="activatorClass">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>

    <GwnEditMemoCard
      v-if="dialog"
      :defaultMemo="memo"
      cardTitle="メモ編集"
      @onOk="editMemo"
      @onCancel="dialog = false"
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
      type: Object,
      require: true
    },
    activatorClass: {
      type: String,
      default: ""
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
      this.$emit("editMemo", newMemo);
    }
  }
};
</script>

<style scoped>
</style>