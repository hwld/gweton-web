<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <v-btn v-on="on" :disabled="activatorDisabled">選択</v-btn>
    </template>

    <v-card v-if="dialog" height="800">
      <v-card-title>ジャンルの選択</v-card-title>
      <GwnGenreListBase class="treeview" @selectGenre="selectGenre"></GwnGenreListBase>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">中止</v-btn>
        <v-btn text @click="select">選択</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GwnGenreListBase from "@/components/organisms/GwnGenreListBase.vue";

export default {
  name: "GwnSelectGenreDialog",

  components: {
    GwnGenreListBase
  },

  props: {
    allGenre: {
      type: Array,
      required: true
    },
    activatorDisabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialog: false,
      selectedGenreId: null
    };
  },

  methods: {
    selectGenre(event) {
      this.selectedGenreId = event;
    },
    select() {
      let genre = null;
      if (this.selectedGenreId != null) {
        genre = this.allGenre.find(genre => genre.id === this.selectedGenreId);
      }

      this.dialog = false;
      this.$emit("select", genre);
    }
  }
};
</script>

<style scoped>
.treeview {
  height: 85%;
}
</style>