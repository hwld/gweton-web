<template>
  <div>
    <GwnGenreListMenu></GwnGenreListMenu>

    <v-treeview
      :items="genres"
      activatable
      item-text="genreName"
      item-children="genres"
      @update:active="SelectGenre"
    ></v-treeview>
  </div>
</template>

<script>
import { mapState } from "vuex"
import * as types from "@/store/mutation-types"
import GwnGenreListMenu from "@/components/organisms/GwnGenreListMenu.vue"

export default {
  name: "GwnGenreList",

  components:{
    GwnGenreListMenu,
  },

  data: () => ({
    active: []
  }),
  computed: {
    ...mapState(["genres"])
  },

  methods: {
    findGenreById(genres, searchId) {
      for (const genre of genres) {
        if (genre.id === searchId) {
          return genre
        }
        if (genre.genres != null) {
          let result = this.findGenreById(genre.genres, searchId)
          if (result != null) {
            return result
          }
        }
      }
    },
    SelectGenre(id) {
      let genre = this.findGenreById(this.genres, id[0])
      this.$store.commit(types.SELECT_GENRE, genre)
    }
  }
}
</script>

<style scoped>
</style>