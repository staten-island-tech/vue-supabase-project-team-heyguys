<template>
    <button class="bg-white border border-gray-200 press-start text-sky-300 h-3px px-2 flex items-center justify-center rounded-lg text-[0.63rem] text-center
            transition-all ease-in-out duration-300 hover:bg-yellow-200/95 hover:text-yellow-500 hover:-translate-y-1 hover:border-yellow-500 hover:border
            active:bg-yellow-300 active:translate-y-[5%]" 
            :class="h"
            @click="sound.play()"
            >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps({
    h: {
        type: String,
        required: true
    }
})
var sound = new Howl({
    src: ['/sounds/click.mp3'],
    volume: .4,
})
</script>

<style scoped>

</style>