<template>
  <div>
    <div v-if="!selectedGenre.id">ジャンルを選択してください</div>
    <GwnMemoListBase v-else :memos="memosInSelectedGenre"></GwnMemoListBase>
    <v-footer padless fixed>
      <v-card width="100%" flat tile class="text-center">
        <v-card-text>
          <GwnMemoListMenu></GwnMemoListMenu>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import GwnMemoListBase from "@/components/organisms/GwnMemoListBase.vue";
import GwnMemoListMenu from "@/components/organisms/GwnMemoListMenu.vue";

export default {
  name: "GwnMemoList",

  components: {
    GwnMemoListBase,
    GwnMemoListMenu
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    },
    memosInSelectedGenre() {
      return this.$store.getters.getMemosByGenreId(this.selectedGenre.id);
    }
  }
};
</script>

<style scoped>
</style>