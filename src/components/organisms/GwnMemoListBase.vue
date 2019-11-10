<template>
  <div>
    <slot name="menu"></slot>
    <div v-if="!selectedGenre.id">ジャンルを選択してください</div>

    <v-list v-else dense class="overflow-y-auto" max-height="86vh">
      <v-list-item-group>
        <v-list-item v-for="memo in memos" :key="memo.id" @click="selectMemo(memo.id)">
          <v-list-item-content>
            <GwnMemoItem :memo="memo"></GwnMemoItem>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import GwnMemoItem from "@/components/organisms/GwnMemoItem.vue";

export default {
  name: "GwnMemoListBase",

  components: {
    GwnMemoItem
  },

  props: {
    memos: {
      type: Array,
      default: () => []
    }
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