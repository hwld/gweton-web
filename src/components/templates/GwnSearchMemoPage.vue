<template>
  <GwnMainPageBase>
    <template v-slot:drawerView>
      <GwnSetSearchCriteriaCard
        @onSearch="search"
        @onCancel="cancel"
        :allGenre="allGenre"
        :authorNameList="authorNameList"
        :bookNameList="bookNameList"
        :defaultCriteria="searchCriteria"
      ></GwnSetSearchCriteriaCard>
    </template>
    <template v-slot:contentView>
      <GwnSearchResultMemoList :searchCriteria="searchCriteria"></GwnSearchResultMemoList>
    </template>
  </GwnMainPageBase>
</template>

<script>
import GwnMainPageBase from "@/components/templates/GwnMainPageBase.vue";
import GwnSearchResultMemoList from "@/components/organisms/GwnSearchResultMemoList.vue";
import GwnSetSearchCriteriaCard from "@/components/molecules/GwnSetSearchCriteriaCard.vue";
export default {
  name: "GwnSearchMemoPage",

  components: {
    GwnMainPageBase,
    GwnSearchResultMemoList,
    GwnSetSearchCriteriaCard
  },

  data() {
    return {
      searchCriteria: {}
    };
  },

  computed: {
    allGenre() {
      return this.$store.getters.getGenreList;
    },
    authorNameList() {
      return this.$store.getters.getAuthorNameList;
    },
    bookNameList() {
      return this.$store.getters.getBookNameList;
    }
  },

  methods: {
    search(criteria) {
      this.searchCriteria = criteria;
    },
    cancel() {
      this.$router.push("home");
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.searchCriteria = to.query;
    });
  }
};
</script>

<style scoped>
</style>