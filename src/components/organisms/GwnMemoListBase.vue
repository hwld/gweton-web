<template>
  <v-list dense class="overflow-y-auto" max-height="87vh">
    <v-list-item-group multiple>
      <v-list-item v-for="memo in memos" :key="memo.id" @click="selectMemo(memo.id)">
        <v-list-item-content>
          <GwnMemoItem :memo="memo"></GwnMemoItem>
        </v-list-item-content>
        <GwnEditMemoMenuItem :memo="memo"></GwnEditMemoMenuItem>
      </v-list-item>
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
    }
  },

  methods: {
    selectMemo(id) {
      this.$store.dispatch("selectMemo", id);
    },

    iconClick() {
      alert("Icon Click");
    }
  }
};
</script>

<style scoped>
</style>