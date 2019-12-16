<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <GwnIconButton
        iconName="edit"
        @click="on.click"
        :disabled="activatorDisabled"
        :classes="activatorClasses"
        :size="size"
      ></GwnIconButton>
    </template>

    <GwnEditGenreCard
      v-if="dialog"
      :defaultGenre="genre"
      cardTitle="メモ編集"
      @onOk="editGenre"
      @onCancel="dialog = false"
    ></GwnEditGenreCard>
  </v-dialog>
</template>

<script>
import GwnEditGenreCard from "@/components/molecules/GwnEditGenreCard.vue";
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnEditGenreMenuItem",

  components: {
    GwnEditGenreCard,
    GwnIconButton
  },

  props: {
    genre: {
      type: Object,
      require: true
    },
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
    editGenre(genre) {
      this.dialog = false;
      this.$emit("editGenre", genre);
    }
  }
};
</script>

<style scoped>
</style>