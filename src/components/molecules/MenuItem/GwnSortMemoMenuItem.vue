<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <GwnIconButton
        iconName="sort"
        @click="on.click"
        :disabled="activatorDisabled"
        :classes="activatorClasses"
        :size="size"
      ></GwnIconButton>
    </template>

    <v-card>
      <v-card-title>メモの並び替え</v-card-title>
      <v-container>
        <v-card-text>対象</v-card-text>
        <v-radio-group v-model="target" row :disabled="order === 'creation'">
          <v-radio label="タイトル" value="title" color="blue"></v-radio>
          <v-radio label="メモ" value="text" color="blue"></v-radio>
          <v-radio label="書籍名" value="bookName" color="blue"></v-radio>
          <v-radio label="著者名" value="authorName" color="blue"></v-radio>
        </v-radio-group>
      </v-container>

      <v-container>
        <v-card-text>順番</v-card-text>
        <v-radio-group v-model="order" row>
          <v-radio label="昇順" value="ascending" color="blue"></v-radio>
          <v-radio label="降順" value="descending" color="blue"></v-radio>
          <v-radio @change="target=''" label="作成順" value="creation" color="blue"></v-radio>
        </v-radio-group>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">中止</v-btn>
        <v-btn text @click="sortMemo">並び替え</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnSortMemoMenuItem",

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
      dialog: false,
      target: "title",
      order: "ascending"
    };
  },

  methods: {
    sortMemo() {
      this.dialog = false;
      this.$emit("sortMemo", { target: this.target, order: this.order });
    }
  }
};
</script>

<style scoped>
</style>