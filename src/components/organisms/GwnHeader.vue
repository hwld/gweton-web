<template>
  <v-app-bar app clipped-left>
    <slot name="prepend"></slot>

    <v-spacer></v-spacer>
    <GwnAuthState></GwnAuthState>
  </v-app-bar>
</template>

<script>
import GwnAuthState from "@/components/organisms/GwnAuthState.vue";

export default {
  name: "GwnHeader",

  components: { GwnAuthState }
};
</script>

<style scoped>
</style>