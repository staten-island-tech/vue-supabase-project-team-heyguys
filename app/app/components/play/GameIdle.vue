<template>
    <div class="w-full h-full justify-around flex flex-col">
        <h3 class="text-2xl text-center justify-start text-yellow-500 press-start mt-12 mb-12"> YOUR PREVIOUS SCORE: {{ score }}</h3>
        <GeneralButton :w="'w-full'" :h="'max-h-[20%]'" @click="$emit('play')">PLAY!</GeneralButton>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['play'])
defineProps({
    score: {
        type: [String, Number],
        required: true
    },
})
</script>

<style scoped>

</style>