<template>
  <v-toolbar>
    <v-btn icon @click="addMemo">
      <v-icon>post_add</v-icon>
    </v-btn>
    <v-btn icon @click="deleteMemo">
      <v-icon>delete</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'GwnMemoListMenu',
  
  methods:{
    addMemo(){
      this.$emit('addMemo')
    },
    deleteMemo(){
      this.$emit('deleteMemo')
    }
  }
}
</script>

<style scoped>
</style>