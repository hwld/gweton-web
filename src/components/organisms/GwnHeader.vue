<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon @click.stop="invertIsOpenDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title class="headline text-uppercase">
      <span>Gweton</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <GwnSearchField></GwnSearchField>
    <v-spacer></v-spacer>

    <GwnAuthState></GwnAuthState>
  </v-app-bar>
</template>

<script>
import GwnAuthState from "@/components/organisms/GwnAuthState.vue";
import GwnSearchField from "@/components/organisms/GwnSearchField.vue";
import * as types from "@/store/mutation-types";

export default {
  name: "GwnHeader",

  components: { GwnAuthState, GwnSearchField },

  computed: {
    isDrawerOpen() {
      return this.$store.getters.getIsDraewrOpen;
    }
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