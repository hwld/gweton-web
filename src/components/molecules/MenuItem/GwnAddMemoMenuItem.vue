<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <GwnIconButton
        iconName="post_add"
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
      cardTitle="メモ作成"
      @onOk="addMemo"
      @onCancel="dialog = false"
    ></GwnEditMemoCard>
  </v-dialog>
</template>

<script>
import GwnEditMemoCard from "@/components/molecules/GwnEditMemoCard.vue";
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnAddMemoMenuItem",

  components: {
    GwnEditMemoCard,
    GwnIconButton
  },

  props: {
    activatorDisabled: {
      type: Boolean,
      default: false
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
    addMemo(memo) {
      this.dialog = false;
      this.$emit("addMemo", memo);
    }
  }
};
</script>

<style scoped>
</style>