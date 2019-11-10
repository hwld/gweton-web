<template>
  <v-app>
    <GwnHeader>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
    </GwnHeader>

    <v-navigation-drawer :value="drawer" app clipped :width="drawerWidth">
      <GwnGenreList></GwnGenreList>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import GwnHeader from "@/components/organisms/GwnHeader.vue";
import GwnGenreList from "@/components/organisms/GwnGenreList.vue";

export default {
  name: "GwnMainView",

  components: {
    GwnHeader,
    GwnGenreList
  },

  data: () => ({
    drawer: true
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