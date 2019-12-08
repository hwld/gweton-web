<template>
  <v-btn icon class="class" :disabled="disabled" @click.stop="on.click" large>
    <v-icon>{{iconName}}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    on: {
      type: Object,
      required: true
    },
    activatorClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
</style>