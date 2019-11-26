<template>
  <div>
    <!-- <GwnGenreListMenu></GwnGenreListMenu> -->

    <GwnGenreListBase @selectGenre="selectGenre" class="treeview"></GwnGenreListBase>
    <v-footer padless absolute>
      <v-card width="100%" flat tile class="text-center">
        <v-card-text>
          <GwnGenreListMenu></GwnGenreListMenu>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import GwnGenreListBase from "@/components/organisms/GwnGenreListBase.vue";
import GwnGenreListMenu from "@/components/organisms/GwnGenreListMenu.vue";

export default {
  name: "GwnGenreList",

  components: {
    GwnGenreListBase,
    GwnGenreListMenu
  },

  methods: {
    selectGenre(selectId) {
      this.$store.dispatch("selectGenre", selectId);
    }
  }
};
</script>

<style scoped>
.treeview {
  max-height: 86vh;
}
</style>