<template>
  <v-list dense class="overflow-y-auto" max-height="87vh">
    <v-list-item-group multiple v-model="selectedMemos">
      <v-list-item v-for="memo in memos" :key="memo.id" :value="memo">
        <v-list-item-content>
          <GwnMemoItem :searchText="searchText" :memo="memo"></GwnMemoItem>
          <v-divider></v-divider>
        </v-list-item-content>
        <GwnMemoListItemMenu :memo="memo"></GwnMemoListItemMenu>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import GwnMemoItem from "@/components/molecules/GwnMemoItem.vue";
import GwnMemoListItemMenu from "@/components/organisms/GwnMemoListItemMenu.vue";

export default {
  name: "GwnMemoListBase",

  components: {
    GwnMemoItem,
    GwnMemoListItemMenu
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