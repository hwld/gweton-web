<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{on}">
      <GwnIconButton
        iconName="search"
        @click="on.click"
        :disabled="activatorDisabled"
        :classes="activatorClasses"
        :size="size"
      ></GwnIconButton>
    </template>

    <GwnSetSearchCriteriaCard
      v-if="dialog"
      :allGenre="allGenre"
      :authorNameList="authorNameList"
      :bookNameList="bookNameList"
      @onCancel="dialog = false"
      @onSearch="searchMemo"
    ></GwnSetSearchCriteriaCard>
  </v-dialog>
</template>

<script>
import GwnSetSearchCriteriaCard from "@/components/molecules/GwnSetSearchCriteriaCard.vue";
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnSearchMemoMenuItem",

  components: {
    GwnSetSearchCriteriaCard,
    GwnIconButton
  },

  props: {
    allGenre: {
      type: Array,
      default: () => []
    },
    authorNameList: {
      type: Array,
      default: () => []
    },
    bookNameList: {
      type: Array,
      default: () => []
    },
    activatorDisabled: {
      type: Boolean,
      default: false
    },
    activatorClasses: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      dialog: false,
      selectedGenreId: null
    };
  },

  methods: {
    searchMemo(criteria) {
      this.dialog = false;
      this.$emit("search", criteria);
    }
  }
};
</script>

<style scoped>
.treeview {
  height: 85%;
}
</style>