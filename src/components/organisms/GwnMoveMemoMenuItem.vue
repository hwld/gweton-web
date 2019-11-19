<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="close">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" :disabled="selectedMemos[0] == null">
        <v-icon>drive_file_move_outline</v-icon>
      </v-btn>
    </template>

    <v-card height="800">
      <v-card-title>メモの移動</v-card-title>
      <GwnGenreListBase class="treeview" :IsDisplay="dialog" @selectGenre="selectGenre"></GwnGenreListBase>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">中止</v-btn>
        <v-btn text @click="moveMemo" :disabled="selectedGenreId == null">移動</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GwnGenreListBase from "@/components/organisms/GwnGenreListBase.vue";

export default {
  name: "GwnMoveMemoMenuItem",

  data() {
    return {
      dialog: false,
      selectedGenreId: null
    };
  },

  components: {
    GwnGenreListBase
  },

  computed: {
    selectedMemos() {
      return this.$store.getters.getSelectedMemos;
    }
  },

  methods: {
    selectGenre(event) {
      this.selectedGenreId = event;
    },
    moveMemo() {
      this.selectedMemos.forEach(memo => {
        memo.genreId = this.selectedGenreId;
        this.$store.dispatch("editMemo", memo);
      });
      this.close();
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.treeview {
  height: 85%;
}
</style>