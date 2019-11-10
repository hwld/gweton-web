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
.memo-title {
  font-size: 1.5rem;
}

.memo-text {
  font-size: 1.2rem;
}

.memo-meta-data-head {
  font-size: 0.9rem;
  color: slategray;
}

.memo-meta-data {
  font-size: 0.9rem;
}
</style>