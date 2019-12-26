<template>
  <GwnMainPageBase>
    <template v-slot:drawerView>
      <GwnGenreList></GwnGenreList>
    </template>
    <template v-slot:contentView>
      <GwnMemoList></GwnMemoList>
    </template>
  </GwnMainPageBase>
</template>

<script>
import GwnMainPageBase from "@/components/templates/GwnMainPageBase.vue";
import GwnGenreList from "@/components/organisms/GwnGenreList.vue";
import GwnMemoList from "@/components/organisms/GwnMemoList.vue";

export default {
  name: "GwnMainView",

  components: {
    GwnMainPageBase,
    GwnGenreList,
    GwnMemoList
  }
};
</script>

<style scoped>
</style>