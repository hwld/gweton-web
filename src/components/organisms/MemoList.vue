<template>
  <div>
    <v-toolbar>
      <v-btn icon>
        <v-icon>post_add</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>

    <div v-if="!selectedGenre">ジャンルを選択してください</div>

    <v-list v-else dense>
      <v-list-item-group>
        <v-list-item v-for="memo in selectedGenre.memos" :key="memo.id">
          <v-list-item-content>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <div class="memo-title">{{memo.title}}</div>
                </v-col>
                <v-col cols="12">
                  <div class="memo-text">{{memo.text}}</div>
                </v-col>
                <v-col cols="6">
                  <div>
                    <span class="memo-meta-data-head">書籍名:</span>
                    <span class="memo-meta-data">{{memo.bookName}}</span>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div>
                    <span class="memo-meta-data-head">著者名:</span>
                    <span class="memo-meta-data">{{memo.authorName}}</span>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MemoList",

  computed: {
    ...mapState(["selectedGenre"])
  }
};
</script>

<style scoped>
.memo-title {
  font-size: 1.5rem;
}

.memo-text {
  font-size: 1.2rem;
}

.memo-meta-data-head {
  font-size: 0.9rem;
  color: slategray;
}

.memo-meta-data {
  font-size: 0.9rem;
}
</style>