<template>
    <div class="bg-yellow-500 left-3 lg:w-[30%] w-[80%] rounded-lg">
        <h4 class="text-white"> {{ text }}</h4>
    </div>
</template>

<script setup lang="ts">
defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>

<style scoped>

</style>