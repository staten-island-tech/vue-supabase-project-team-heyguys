<template>
    <div class="carousel rounded-box bg-white w-full h-[68%] p-[1%] flex flex-row items-center justify-center">
        <div class="carousel-item w-[30%] h-full bg-black mx-[2%]" v-for="result in results">
            {{ result }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    results: {
        type: Array,
        required: true
    }
})

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