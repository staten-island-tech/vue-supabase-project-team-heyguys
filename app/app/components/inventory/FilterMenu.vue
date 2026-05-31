<script setup lang="ts">
defineProps<{
  filters: string[]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <inventory-filter-button
      v-for="filter in filters"
      :key="filter"
      h="h-10"
    >
      {{ filter }}
    </inventory-filter-button>
  </div>
</template>