<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <GwnIconButton
        iconName="delete"
        @click="on.click"
        :disabled="activatorDisabled"
        :classes="activatorClasses"
        :size="size"
      ></GwnIconButton>
    </template>

    <v-card>
      <v-card-title>削除確認</v-card-title>
      <v-card-text>メモを削除しても良いですか?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">いいえ</v-btn>
        <v-btn text @click="deleteMemos()">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnDeleteMemoMenuItem",

  components: {
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
    deleteMemos() {
      this.$emit("deleteMemos");
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
</style>