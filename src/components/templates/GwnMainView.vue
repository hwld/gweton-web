<template>
  <v-app>
    <GwnHeader></GwnHeader>

    <v-navigation-drawer :value="isDrawerOpen" app clipped :width="drawerWidth">
      <GwnGenreList></GwnGenreList>
    </v-navigation-drawer>

    <v-content>
      <GwnMemoList></GwnMemoList>
    </v-content>
  </v-app>
</template>

<script>
import GwnHeader from "@/components/organisms/GwnHeader.vue";
import GwnMemoList from "@/components/organisms/GwnMemoList.vue";
import GwnGenreList from "@/components/organisms/GwnGenreList.vue";
import { mapState } from "vuex";

export default {
  name: "GwnMainView",

  components: {
    GwnHeader,
    GwnMemoList,
    GwnGenreList
  },

  data: () => ({
    drawer: null
  }),

  computed: {
    drawerWidth() {
      return window.parent.screen.width * 0.3;
    },
    ...mapState(["isDrawerOpen"])
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style scoped>
</style>