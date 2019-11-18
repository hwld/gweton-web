<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" :disabled="selectedMemos[0] == null">
        <v-icon>drive_file_move_outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <GwnGenreList></GwnGenreList>
    </v-card>
  </v-dialog>
</template>

<script>
import GwnGenreList from "@/components/organisms/GwnGenreList.vue";

export default {
  name: "GwnMoveMemoMenuItem",

  components: {
    GwnGenreList
  },

  computed: {
    selectedMemos() {
      return this.$store.getters.getSelectedMemos;
    }
  },

  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style scoped>
</style>