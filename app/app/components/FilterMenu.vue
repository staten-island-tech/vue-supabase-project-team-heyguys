<script setup lang="ts">
import FilterButton from './FilterButton.vue'

defineProps<{
  filters: string[]
}>()
</script>

<template>
  <div class="flex gap-1">
    <FilterButton
      v-for="filter in filters"
      :key="filter"
      h="h-10"
    >
      {{ filter }}
    </FilterButton>
  </div>
</template>