<template>
  <v-btn icon @click="addMemo">
    <v-icon>post_add</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'GwnAddMemoMenuItem',

  methods:{
    addMemo(){
      this.$emit('addMemo')
    },
  }
}
</script>

<style scoped>
</style>