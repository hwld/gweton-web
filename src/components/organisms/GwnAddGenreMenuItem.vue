<template>
  <v-dialog v-model="dialog" max-width="800" @click:outside="cancel">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>playlist_add</v-icon>
      </v-btn>
    </template>

    <!--ダイアログの外側がクリックされたときにフィールドをリセットするために、空のメモオブジェクトを渡す。-->
    <!--外側がクリックされたら、メモオブジェクトを空文字でリセットし、反映させる。-->
    <GwnEditGenreCard
      :defaultGenre="genre"
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
      dialog: false,
      genre: { genreName: "" }
    };
  },

  methods: {
    addGenre(genre) {
      this.dialog = false;
      this.$store.dispatch("addGenre", {
        genre: genre,
        parentGenreId: this.selectedGenre.id
      });
      this.resetGenre();
    },
    cancel() {
      this.dialog = false;
      this.resetGenre();
    },
    resetGenre() {
      //defaultGenreとして渡すオブジェクトを空にすることで、フィールドをリセットする
      this.genre = { genreName: "" };
    }
  }
};
</script>

<style scoped>
</style>