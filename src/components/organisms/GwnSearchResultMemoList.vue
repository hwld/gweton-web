<template>
  <div>
    <GwnMemoListMenu></GwnMemoListMenu>
    <div v-if="!selectedGenre.id">ジャンルを選択してください</div>

    <v-list v-else dense class="overflow-y-auto" max-height="86vh">
      <v-list-item-group>
        <v-list-item v-for="memo in filteredMemos" :key="memo.id" @click="selectMemo(memo.id)">
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
import GwnMemoListMenu from "@/components/organisms/GwnMemoListMenu.vue";
import * as types from "@/store/mutation-types";

export default {
  name: "GwnSearchResultMemoList",

  components: {
    GwnMemoItem,
    GwnMemoListMenu
  },

  data() {
    return {
      filterTargetMemos: []
    };
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    },

    filterText() {
      return this.$store.getters.getFilterText;
    },

    filteredMemos() {
      return false;
    }
  },

  methods: {
    selectMemo(id) {
      this.$store.commit(types.SELECT_MEMO, id);
    },
    setFilterTargetMemos(genres) {
      for (const genre of genres) {
        this.filterTargetMemos.push(...genre.memos);
        this.setFilterTargetMemos(genre.genres);
      }
    }
  },

  watch: {
    selectedGenre: {
      handler(genre) {
        let arr = [genre];
        this.setFilterTargetMemos(arr);
      }
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