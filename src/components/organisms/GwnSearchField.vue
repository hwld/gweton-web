<template>
  <v-text-field
    outlined
    dense
    hide-details
    prepend-inner-icon="search"
    clearable
    :placeholder="searchTarget"
  ></v-text-field>
</template>

<script>
export default {
  computed: {
    searchTarget() {
      return `「${this.$store.getters.getSelectedGenre.genreName}」内のすべてのメモを検索`;
    }
  },
  methods: {
    searchEnd() {
      alert("SearchEnd");
    }
  }
};
</script>

<style scoped>
</style>