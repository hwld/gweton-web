<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" x-large class="mx-10">
        <v-icon>playlist_add</v-icon>
      </v-btn>
    </template>

    <!--ダイアログの外側がクリックされたときにフィールドをリセットするために、空のメモオブジェクトを渡す。-->
    <!--外側がクリックされたら、メモオブジェクトを空文字でリセットし、反映させる。-->
    <GwnEditGenreCard
      v-if="dialog"
      cardTitle="ジャンル作成"
      okButtonText="作成"
      @onOk="addGenre"
      @onCancel="cancel"
    ></GwnEditGenreCard>
  </v-dialog>
</template>

<script>
import GwnEditGenreCard from "@/components/organisms/GwnEditGenreCard.vue";

export default {
  name: "GwnAddGenreMenuItem",

  components: {
    GwnEditGenreCard
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
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
      this.$store.dispatch("addGenre", {
        genre: genre,
        parentGenreId: this.selectedGenre.id
      });
    },
    cancel() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
</style>