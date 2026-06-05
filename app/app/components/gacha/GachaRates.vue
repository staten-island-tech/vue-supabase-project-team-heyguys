<template>
    <div
        class="fixed w-[90%] h-[90%] left-[5%] top-[5%] bg-slate-300/60 z-10  rounded-3xl border-yellow-500 border-2 p-[1%] flex flex-col">
        <div class="flex min-h-[10%] justify-between items-center">
            <general-button :w="'aspect-square'" :h="'h-full'" @click="$emit('close')">X</general-button>
            <h2 class="press-start text-2xl text-white bg-yellow-500 h-full rounded-2xl border-2 border-white flex items-center px-[2%]"> GACHA RATES </h2>
        </div>
        <div class="h-[89%] w-full border-2 border-yellow-500 mt-[1%] mb-[2%] rounded-2xl">
            <gacha-rates-pie></gacha-rates-pie>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<style scoped>

</style>