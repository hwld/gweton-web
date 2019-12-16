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
    },
    small: {
      type: Boolean,
      default: false
    },
    xSmall: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    xLarge: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
</style>