<template>
  <v-toolbar>
    <GwnAddMemoMenuItem @addMemo="addMemo"></GwnAddMemoMenuItem>
    <GwnDeleteMemoMenuItem @deleteMemo="deleteMemo" :selectedMemoId="selectedMemoId"></GwnDeleteMemoMenuItem>
  </v-toolbar>
</template>

<script>
import GwnAddMemoMenuItem from '@/components/organisms/GwnAddMemoMenuItem.vue'
import GwnDeleteMemoMenuItem from '@/components/organisms/GwnDeleteMemoMenuItem.vue'

export default {
  name: 'GwnMemoListMenu',
  
  components: {
    GwnAddMemoMenuItem,
    GwnDeleteMemoMenuItem,
  },

  props:{
    selectedMemoId: {
      type: Number,
      default: 0,
    }
  },

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