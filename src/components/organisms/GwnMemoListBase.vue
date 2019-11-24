<template>
  <v-list dense class="overflow-y-auto" max-height="87vh">
    <v-list-item-group multiple v-model="selectedMemos">
      <template v-for="memo in memos">
        <v-list-item :key="memo.id" :value="memo">
          <v-list-item-content>
            <GwnMemoItem :searchText="searchText" :memo="memo"></GwnMemoItem>
          </v-list-item-content>
          <GwnEditMemoMenuItem :memo="memo"></GwnEditMemoMenuItem>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import GwnMemoItem from "@/components/organisms/GwnMemoItem.vue";
import GwnEditMemoMenuItem from "@/components/organisms/GwnEditMemoMenuItem.vue";

export default {
  name: "GwnMemoListBase",

  components: {
    GwnMemoItem,
    GwnEditMemoMenuItem
  },

  props: {
    memos: {
      type: Array,
      default: () => []
    },
    searchText: {
      type: String,
      default: null
    }
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    },
    selectedMemos: {
      get: function() {
        return this.$store.getters.getSelectedMemos;
      },
      set: function(memos) {
        let memosIds = [];
        memos.forEach(memo => memosIds.push(memo.id));
        this.$store.dispatch("selectMemos", memosIds);
      }
    }
  }
};
</script>

<style scoped>
</style>