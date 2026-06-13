<template>
  <div class="flex flex-wrap gap-1">
    <inventory-filter-button
      v-for="filter in filters"
      :key="filter.displayName"
      h="h-10"
      @click="$emit('useFilter', filter.filterProp)"
    >
      {{ filter.displayName }}
    </inventory-filter-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  filters: (filter)[]
}>()
const emit = defineEmits(['useFilter'])

</script>