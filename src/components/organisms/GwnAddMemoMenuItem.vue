<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn icon @click.stop="on.click" :disabled="selectedGenre.id == null" large class="mx-4">
        <v-icon>post_add</v-icon>
      </v-btn>
    </template>

    <GwnEditMemoCard v-if="dialog" cardTitle="メモ作成" @onOk="addMemo" @onCancel="dialog = false"></GwnEditMemoCard>
  </v-dialog>
</template>

<script>
import GwnEditMemoCard from "@/components/organisms/GwnEditMemoCard.vue";

export default {
  name: "GwnAddMemoMenuItem",

  components: {
    GwnEditMemoCard
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
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
      this.$store.dispatch("addMemo", {
        memo,
        genreId: this.selectedGenre.id
      });
    }
  }
};
</script>

<style scoped>
</style>