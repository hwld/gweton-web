<template>
  <v-dialog v-model="dialog" max-width="650">
    <template v-slot:activator="{on}">
      <v-btn icon v-on="on" :disabled="selectedMemoId===0">
        <v-icon>delete</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>削除確認</v-card-title>
      <v-card-text>メモを削除しても良いですか?</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="dialog = false">いいえ</v-btn>

        <v-btn text @click="dialog = false, deleteMemo()">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'GwnDeleteMemoMenuItem',
  
  data() {
    return {
      dialog: false,
    }
  },

  props:{
    selectedMemoId:{
      type: Number,
      default: 0,
    }
  },

  methods: {
    deleteMemo(){
      this.$emit('deleteMemo')
    }    
  },
}
</script>

<style scoped>
</style>