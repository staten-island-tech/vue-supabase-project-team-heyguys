<template>
    <button class="aspect-square border-2 w-[full] rounded-lg px-1 font-black text-xs text-white
                ease-in-out duration-300 hover:-translate-y-[2%] active:translate-y-[2%]" 
                :class="buttonClasses"> 
                {{ symbol }} </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'add' | 'remove' | 'edit' | 'delete'
}>()

const symbol = computed(() => {
  return props.type === 'add' ? '+' : props.type === 'remove' ? '-' : props.type === 'edit' ? '🛠' : '🗑'
})

const buttonClasses = computed(() => {
  if (props.type === 'add'){
    return 'bg-green-300 border-green-700 hover:bg-green-400 hover:border-green-800'
  }
  if (props.type === 'remove'){
    return 'bg-red-300 border-red-700 hover:bg-red-400 hover:border-red-800'
  }
  if (props.type === 'delete'){
    return 'bg-red-300 border-red-700 hover:bg-red-400 hover:border-red-800'
  }
  return 'bg-green-300 border-green-700 hover:bg-green-400 hover:border-green-800'
})
</script>

<style scoped>

</style>