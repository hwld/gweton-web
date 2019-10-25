<template>
  <div>
    <GwnMemoListMenu
      @deleteMemo="deleteMemo"
      @addMemo="addMemo"
      :selectedGenre="selectedGenre"
      :selectedMemoId="selectedMemoId"
    ></GwnMemoListMenu>

    <div v-if="!selectedGenre">ジャンルを選択してください</div>

    <v-list v-else dense>
      <v-list-item-group>
        <v-list-item
          v-for="memo in selectedGenre.memos"
          :key="memo.id"
          @click="SelectMemo(memo.id)"
        >
          <v-list-item-content>
            <GwnMemoItem :memo="memo"></GwnMemoItem>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GwnMemoItem from "@/components/organisms/GwnMemoItem.vue";
import GwnMemoListMenu from "@/components/organisms/GwnMemoListMenu.vue";
import * as types from "@/store/mutation-types";

export default {
  name: "GwnMemoList",

  components: {
    GwnMemoItem,
    GwnMemoListMenu
  },

  computed: {
    ...mapState(["selectedGenre", "selectedMemoId"])
  },

  methods: {
    SelectMemo(id) {
      this.$store.commit(types.SELECT_MEMO_ID, id);
    },

    deleteMemo() {
      this.$store.commit(types.DELETE_MEMO);
    },

    addMemo(memo) {
      this.$store.commit(types.ADD_MEMO, memo);
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