<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="memo-title">{{memo.title}}</div>
      </v-col>
      <v-col cols="12">
        <div class="memo-text">テキスト</div>
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
</template>

<script>
export default {
  name: 'GwnMemoItem',

  props: {
    memo: {
      type: Object,
      default: () => {}
    }
  }
  
}
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