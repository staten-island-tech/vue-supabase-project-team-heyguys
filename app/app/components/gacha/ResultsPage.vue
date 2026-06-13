<template>
    <div class="carousel rounded-3xl bg-white border-yellow-500 border-2 w-full h-[68%] p-[1%] flex flex-row items-center justify-center">
        <GachaResult v-for="result in results" :result="result">
        </GachaResult>
    </div>
</template>

<script setup lang="ts">
import type { ResultType } from '#imports';
defineProps<{results: ResultType[]}>()

</script>

<style scoped>
.result-page-enter-from {
    opacity: 0;
    transform: translateX(200%)
}
.result-page-enter-active {
    transition: all 0.5s ease-out;
}
.result-page-enter-to {
    opacity: 1;
    transform: translateX(0%)
}
</style>