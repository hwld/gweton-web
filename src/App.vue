<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Gweton</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon x-large>search</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped :width="drawerWidth">
      <GenreList></GenreList>
    </v-navigation-drawer>

    <v-content>
      <MemoList></MemoList>
    </v-content>
  </v-app>
</template>

<script>
import MemoList from "@/components/organisms/MemoList.vue";
import GenreList from "@/components/organisms/GenreList.vue";

export default {
  name: "App",

  components: {
    MemoList,
    GenreList
  },

  data: () => ({
    drawer: null
  }),

  computed: {
    drawerWidth() {
      return window.parent.screen.width * 0.3;
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style scoped>
</style>