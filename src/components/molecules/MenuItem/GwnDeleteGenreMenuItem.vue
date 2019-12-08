<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-btn
        icon
        @click.stop="on.click"
        :disabled="activatorDisabled"
        large
        :class="activatorClass"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>削除確認</v-card-title>
      <v-card-text>ジャンルを削除しても良いですか?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">いいえ</v-btn>
        <v-btn text @click="deleteGenre()">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GwnDeleteGenreMenuItem",

  data() {
    return {
      dialog: false
    };
  },

  props: {
    activatorDisabled: {
      type: Boolean,
      default: false
    },
    activatorClass: {
      type: String,
      default: ""
    }
  },

  methods: {
    deleteGenre() {
      this.dialog = false;
      this.$emit("deleteGenre");
    }
  }
};
</script>

<style scoped>
</style>