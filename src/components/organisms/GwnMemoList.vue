<template>
  <div>
    <GwnMemoListMenu></GwnMemoListMenu>
    <div v-if="!selectedGenre.id">ジャンルを選択してください</div>
    <GwnMemoListBase v-else :memos="selectedGenre.memos"></GwnMemoListBase>
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
    genres() {
      return this.$store.getters.getGenres;
    }
  },

  methods: {
    selectMemo(id) {
      this.$store.dispatch("selectMemo", id);
    }
  }
};
</script>

<style scoped>
</style>