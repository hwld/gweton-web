<template>
  <v-app>
    <GwnHeader>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
    </GwnHeader>

    <v-navigation-drawer v-model="drawer" app clipped :width="drawerWidth">
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
    drawer: true,
    drawerWidth: null
  }),

  created() {
    this.$vuetify.theme.dark = true;

    const screenWidth = window.parent.screen.width;
    if (screenWidth >= 960) {
      this.drawerWidth = screenWidth * 0.3;
      this.drawer = true;
    } else {
      this.drawerWidth = screenWidth * 0.8;
      this.drawer = false;
    }

    this.$store.dispatch("downloadData");
  }
};
</script>

<style scoped>
</style>