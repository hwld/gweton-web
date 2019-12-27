<template>
  <GwnMainPageBase>
    <template v-slot:drawerView>
      <GwnSetSearchCriteriaCard
        :allGenre="allGenre"
        :defaultCriteria="defaultCriteria"
        @onSearch="search"
      ></GwnSetSearchCriteriaCard>
    </template>
    <template v-slot:contentView>
      <GwnSearchResultMemoList></GwnSearchResultMemoList>
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
      defaultCriteria: {}
    };
  },

  computed: {
    allGenre() {
      return this.$store.getters.getGenreList;
    }
  },

  methods: {
    search(criteria) {
      this.$router
        .push({
          path: "/search",
          query: criteria
        })
        .catch(error => {
          switch (error.name) {
            case "NavigationDuplicated":
              //何もしない
              break;
          }
        });
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.defaultCriteria = to.query;
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.defaultCriteria = to.query;
    next();
  }
};
</script>

<style scoped>
</style>