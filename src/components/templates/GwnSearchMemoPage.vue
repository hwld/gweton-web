<template>
  <GwnMainPageBase>
    <template v-slot:drawerView>
      <GwnSetSearchCriteriaCard></GwnSetSearchCriteriaCard>
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
  }
};
</script>

<style scoped>
</style>