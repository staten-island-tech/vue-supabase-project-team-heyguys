<template>
    <div
        class="fixed w-[90%] h-[90%] left-[5%] top-[5%] bg-slate-300/60 z-10  rounded-3xl border-yellow-500 border-2 p-[1%] flex flex-col">
        <general-button :w="'aspect-square'" :h="'max-h-[10%]'" @click="$emit('close')">X</general-button>
        <div class="h-full">
            hello
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<style scoped>

</style>