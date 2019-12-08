<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        @click.stop="on.click"
        :disabled="activatorDisabled"
        large
        :class="activatorClass"
      >
        <v-icon>post_add</v-icon>
      </v-btn>
    </template>

    <GwnEditMemoCard v-if="dialog" cardTitle="メモ作成" @onOk="addMemo" @onCancel="dialog = false"></GwnEditMemoCard>
  </v-dialog>
</template>

<script>
import GwnEditMemoCard from "@/components/organisms/GwnEditMemoCard.vue";

export default {
  name: "GwnAddMemoMenuItem",

  components: {
    GwnEditMemoCard
  },

  props: {
    activatorDisabled: {
      type: Boolean,
      default: false
    },
    activatorClass: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      dialog: false
    };
  },

  methods: {
    addMemo(memo) {
      this.dialog = false;
      this.$emit("addMemo", memo);
    }
  }
};
</script>

<style scoped>
</style>