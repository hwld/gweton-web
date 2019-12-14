<template>
  <div>
    <v-alert v-if="!selectedGenre.id" type="info">ジャンルを選択してください</v-alert>
    <GwnMemoListBase v-else :memos="viewMemos"></GwnMemoListBase>
    <v-footer padless fixed>
      <v-card width="100%" flat tile class="text-center">
        <v-card-text>
          <GwnMemoListMenu @sortMemo="sortMemo"></GwnMemoListMenu>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import GwnMemoListBase from "@/components/organisms/GwnMemoListBase.vue";
import GwnMemoListMenu from "@/components/organisms/GwnMemoListMenu.vue";

export default {
  name: "GwnMemoList",

  components: {
    GwnMemoListBase,
    GwnMemoListMenu
  },

  data() {
    return {
      sortMemoInfo: { target: "", order: "creation" }
    };
  },

  computed: {
    selectedGenre() {
      return this.$store.getters.getSelectedGenre;
    },
    memosInSelectedGenre() {
      return this.$store.getters.getMemosByGenreId(this.selectedGenre.id);
    },
    viewMemos() {
      return [...this.memosInSelectedGenre].sort(
        this.compareFunctionGenerator(
          this.sortMemoInfo.target,
          this.sortMemoInfo.order
        )
      );
    }
  },

  methods: {
    sortMemo(sortMemoInfo) {
      this.sortMemoInfo = sortMemoInfo;
    },

    compareFunctionGenerator(propName, order) {
      return function(memo1, memo2) {
        if (order === "creation") return 0;
        window.console.log(propName + ":" + order);
        var target1 = memo1[propName].toUpperCase();
        var target2 = memo2[propName].toUpperCase();
        if (target1 < target2) {
          return order === "ascending" ? -1 : 1;
        }
        if (target1 > target2) {
          return order === "ascending" ? 1 : -1;
        }
        return 0;
      };
    }
  }
};
</script>

<style scoped>
.text {
  color: white;
}
</style>