<template>
    <div class="w-full h-[20%] border-yellow-400 border-2">
        {{ item }}
    </div>
</template>

<script setup lang="ts">
defineProps<{item: ownedRobotPart}>()
</script>

<style scoped>

</style>