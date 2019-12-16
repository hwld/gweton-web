<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <GwnIconButton
        iconName="edit"
        @click="on.click"
        :disabled="activatorDisabled"
        :classes="activatorClasses"
        :size="size"
      ></GwnIconButton>
    </template>

    <GwnEditMemoCard
      v-if="dialog"
      :authorNameList="authorNameList"
      :bookNameList="bookNameList"
      :defaultMemo="memo"
      cardTitle="メモ編集"
      @onOk="editMemo"
      @onCancel="dialog = false"
    ></GwnEditMemoCard>
  </v-dialog>
</template>

<script>
import GwnEditMemoCard from "@/components/molecules/GwnEditMemoCard.vue";
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnEditMemoMenuItem",

  components: {
    GwnEditMemoCard,
    GwnIconButton
  },

  props: {
    memo: {
      type: Object,
      require: true
    },
    activatorClasses: {
      type: Array,
      default: () => []
    },
    authorNameList: {
      type: Array,
      default: () => []
    },
    bookNameList: {
      type: Array,
      default: () => []
    },
    size: {
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