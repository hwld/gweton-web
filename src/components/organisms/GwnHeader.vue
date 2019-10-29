<template>
  <v-app-bar app clipped-left max-height="10vh">
    <v-app-bar-nav-icon @click.stop="invertIsOpenDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline text-uppercase">
      <span>Gweton</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon x-large>search</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <GwnAuthState></GwnAuthState>
  </v-app-bar>
</template>

<script>
import GwnAuthState from "@/components/organisms/GwnAuthState.vue";
import * as types from "@/store/mutation-types";
import { mapState } from "vuex";

export default {
  name: "GwnHeader",

  components: { GwnAuthState },

  computed: {
    ...mapState(["isDrawerOpen"])
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