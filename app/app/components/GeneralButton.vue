<template>
    <button class="bg-white border-2 border-yellow-500 press-start text-yellow-500 h-full flex items-center justify-center rounded-2xl text-2xl text-center
            transition-all ease-in-out duration-300 hover:bg-yellow-400/95 hover:text-white hover:-translate-y-[5%] hover:border-2 hover:border-orange-500
            active:bg-yellow-300 active:translate-y-[5%]
            " :class="[w, h]"
            >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps({
    w: {
        type: String,
        required: true
    },
    h: {
        type: String,
        required: true
    }
})
</script>

<style scoped>

</style>