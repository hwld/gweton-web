<template>
  <GwnIconButton
    iconName="close"
    @click="$emit('close')"
    :disabled="activatorDisabled"
    :classes="activatorClasses"
    :size="size"
  ></GwnIconButton>
</template>

<script>
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnSearchMemoMenuItem",

  components: {
    GwnIconButton
  },

  props: {
    activatorDisabled: {
      type: Boolean,
      default: false
    },
    activatorClasses: {
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
.treeview {
  height: 85%;
}
</style>