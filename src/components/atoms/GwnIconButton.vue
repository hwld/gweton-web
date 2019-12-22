<template>
  <v-btn
    icon
    @click.stop="$emit('click')"
    :disabled="disabled"
    :class="classes"
    :small="size === 'small'"
    :x-small="size === 'x-small'"
    :large="size === 'large'"
    :x-large="size === 'x-large'"
  >
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
    classes: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
</style>