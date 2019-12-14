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
        <v-icon>playlist_add</v-icon>
      </v-btn>
    </template>

    <GwnEditGenreCard v-if="dialog" cardTitle="ジャンル作成" @onOk="addGenre" @onCancel="dialog = false"></GwnEditGenreCard>
  </v-dialog>
</template>

<script>
import GwnEditGenreCard from "@/components/molecules/GwnEditGenreCard.vue";

export default {
  name: "GwnAddGenreMenuItem",

  components: {
    GwnEditGenreCard
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
    addGenre(genre) {
      this.dialog = false;
      this.$emit("addGenre", genre);
    }
  }
};
</script>

<style scoped>
</style>