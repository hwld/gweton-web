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
        <v-icon>edit</v-icon>
      </v-btn>
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

export default {
  name: "GwnEditGenreMenuItem",

  components: {
    GwnEditGenreCard
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
    editGenre(genre) {
      this.dialog = false;
      this.$emit("editGenre", genre);
    }
  }
};
</script>

<style scoped>
</style>