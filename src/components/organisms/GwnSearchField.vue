<template>
  <v-text-field
    v-model="filterText"
    outlined
    dense
    hide-details
    prepend-inner-icon="search"
    :append-icon="isSearchMode ? 'clear' : ''"
    :placeholder="placeholder"
    @focus="onFocus"
    @click:append="clear"
    @keydown="keydown"
    ref="field"
    autocomplete="off"
  ></v-text-field>
</template>

<script>
import * as types from "@/store/mutation-types.js";

export default {
  data() {
    return {
      isSearchMode: false
    };
  },

  computed: {
    filterText: {
      get: function() {
        return this.$store.getters.getFilterText;
      },
      set: function(value) {
        this.$store.commit(types.SET_FILTER_TEXT, value);
      }
    },
    selectedGenreName() {
      return this.$store.getters.getSelectedGenre.genreName;
    },
    placeholder() {
      if (this.isSearchMode) {
        return this.selectedGenreName == null
          ? `全ジャンルのメモを検索中`
          : `「${this.selectedGenreName}」内のメモを検索中`;
      } else {
        return "検索";
      }
    }
  },
  methods: {
    onFocus() {
      if (!this.isSearchMode) {
        this.isSearchMode = true;
        this.$router.push("/search");
      }
    },
    clear() {
      this.filterText = "";
      this.isSearchMode = false;
      this.$refs.field.blur();
      this.$router.push("/home");
    },
    keydown(event) {
      if (event.key === "Enter") this.$refs.field.blur();
    }
  }
};
</script>

<style scoped>
</style>