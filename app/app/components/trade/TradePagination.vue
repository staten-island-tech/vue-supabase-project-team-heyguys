<template>
    <div class="w-[97%] h-[13%] flex flex-row justify-between items-center mx-auto">
        <GeneralButton w="w-[14%]" h="h-[100%]" @click="$emit('back')"> <-</GeneralButton>
        <h3 class="text-yellow-400 press-start text-xl w-[30%] text-center"> {{ pageNum }} of {{ pageCount }} </h3>
        <GeneralButton w="w-[14%]" h="h-[100%]" @click="$emit('forward')"> -></GeneralButton>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['back', 'forward'])
defineProps({
    pageNum: {
        type: Number,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    }
})
</script>

<style scoped>

</style>