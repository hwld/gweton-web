<template>
  <v-list dense class="overflow-y-auto" max-height="87vh">
    <v-list-item-group>
      <v-list-item v-for="memo in memos" :key="memo.id" @click="selectMemo(memo.id)">
        <v-list-item-content>
          <GwnMemoItem :memo="memo"></GwnMemoItem>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
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

  methods: {
    selectMemo(id) {
      window.console.log(id);
      this.$store.dispatch("selectMemo", id);
    }
  }
};
</script>

<style scoped>
</style>