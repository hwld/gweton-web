<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on }">
      <GwnIconButton
        iconName="drive_file_move_outline"
        @click="on.click"
        :disabled="activatorDisabled"
        :classes="activatorClasses"
        :size="size"
      ></GwnIconButton>
    </template>

    <v-card v-if="dialog" height="800">
      <v-card-title>メモの移動</v-card-title>
      <GwnGenreListBase class="treeview" @selectGenre="selectGenre"></GwnGenreListBase>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">中止</v-btn>
        <v-btn text @click="moveMemo" :disabled="selectedGenreId == null">移動</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GwnGenreListBase from "@/components/organisms/GwnGenreListBase.vue";
import GwnIconButton from "@/components/atoms/GwnIconButton.vue";

export default {
  name: "GwnMoveMemoMenuItem",

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
      dialog: false,
      selectedGenreId: null
    };
  },

  components: {
    GwnGenreListBase,
    GwnIconButton
  },

  methods: {
    selectGenre(event) {
      this.selectedGenreId = event;
    },
    moveMemo() {
      this.dialog = false;
      this.$emit("moveMemo", this.selectedGenreId);
    }
  }
};
</script>

<style scoped>
.treeview {
  height: 85%;
}
</style>