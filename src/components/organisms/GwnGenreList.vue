<template>
  <div>
    <GwnGenreListMenu></GwnGenreListMenu>

    <v-treeview
      :items="genreTree"
      activatable
      item-text="genreName"
      item-children="childrenGenre"
      @update:active="selectGenre"
      class="treeview overflow-y-auto"
    ></v-treeview>
  </div>
</template>

<script>
import GwnGenreListMenu from "@/components/organisms/GwnGenreListMenu.vue";
import undefined from "firebase/empty-import";

export default {
  name: "GwnGenreList",

  components: {
    GwnGenreListMenu
  },

  data: () => ({
    active: []
  }),

  computed: {
    genreTree() {
      let tree = [];

      //親を持たないジャンルを抽出
      this.$store.getters.getGenresByParentId(undefined).forEach(genre => {
        //ツリー用のジャンルオブジェクトを作成する
        tree.push(this.createGenreForTreeView(genre));
      });

      this.buildGenreTree(tree);

      return tree;
    },

    AllGenreList() {
      return this.$store.getters.getGenreList;
    }
  },

  methods: {
    selectGenre(selectId) {
      this.$store.dispatch("selectGenre", selectId[0]);
    },

    createGenreForTreeView(genre) {
      //元のジャンルを変更せずに、プロパティを追加したジャンルオブジェクトを返す
      return Object.assign(Object.create(genre), { childrenGenre: [] });
    },

    //受け取ったジャンルのリストの各ジャンルオブジェクトに子ジャンルオブジェクトを追加していく
    buildGenreTree(genres) {
      for (const genre of genres) {
        const rawChildrenGenre = this.AllGenreList.filter(childGenre =>
          genre.childrenId.includes(childGenre.id)
        );

        //ツリー用のジャンルオブジェクトを作成する
        const childrenGenre = [];
        rawChildrenGenre.forEach(genre => {
          childrenGenre.push(this.createGenreForTreeView(genre));
        });

        genre.childrenGenre.push(...childrenGenre);

        this.buildGenreTree(childrenGenre);
      }
    }
  }
};
</script>

<style scoped>
.treeview {
  max-height: 86vh;
}
.v-treeview-node__content,
.v-treeview-node__label {
  word-break: break-all;
}
</style>