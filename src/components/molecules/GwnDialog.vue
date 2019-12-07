<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn icon @click.stop="on.click" :disabled="activatorDisabled" large>
        <v-icon>{{iconName}}</v-icon>
      </v-btn>
    </template>

    <slot name="content"></slot>
  </v-dialog>
</template>

<script>
export default {
  name: "GwnDialog",

  props: {
    iconName: {
      type: String
    },
    activatorDisabled: {
      type: Boolean
    }
  },

  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style scoped>
</style>