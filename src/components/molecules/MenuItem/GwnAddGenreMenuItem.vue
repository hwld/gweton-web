<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <GwnIconButton
        iconName="playlist_add"
        @click="on.click"
        :disabled="activatorDisabled"
        :classes="activatorClasses"
        :size="size"
      ></GwnIconButton>
    </template>

    <GwnEditGenreCard v-if="dialog" cardTitle="ジャンル作成" @onOk="addGenre" @onCancel="dialog = false"></GwnEditGenreCard>
  </v-dialog>
</template>

<script>
import GwnEditGenreCard from "@/components/molecules/GwnEditGenreCard.vue";
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnAddGenreMenuItem",

  components: {
    GwnEditGenreCard,
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
  },

  data() {
    return {
      dialog: false
    };
  },

  methods: {
    addGenre(genre) {
      this.dialog = false;
      this.$emit("addGenre", genre);
    }
  }
};
</script>

<style scoped>
</style>