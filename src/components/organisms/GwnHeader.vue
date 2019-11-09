<template>
  <v-app-bar app clipped-left>
    <slot name="prepend"></slot>

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

export default {
  name: "GwnHeader",

  components: { GwnAuthState, GwnSearchField }
};
</script>

<style scoped>
</style>