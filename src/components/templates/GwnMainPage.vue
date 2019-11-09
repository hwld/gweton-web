<template>
  <v-app>
    <GwnHeader>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="invertIsOpenDrawer"></v-app-bar-nav-icon>
      </template>
    </GwnHeader>

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
import * as types from "@/store/mutation-types";

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
    isDrawerOpen() {
      return this.$store.getters.getIsDrawerOpen;
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
  },

  methods: {
    invertIsOpenDrawer() {
      this.$store.commit(types.INVERT_IS_DRAWER_OPEN);
    }
  }
};
</script>

<style scoped>
</style>