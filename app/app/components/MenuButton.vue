<template>
    <router-link :to="url" class="bg-white/95 text-cyan-400 w-[80%] h-[13vh] rounded-[6.5vh] flex items-center justify-center
    transition-all ease-in-out duration-300 hover:bg-yellow-400/95 hover:text-white hover:-translate-y-[5%] hover:border-2 hover:border-orange-500
    active:bg-yellow-300 active:translate-y-[5%]
    ">
        <h2 class="lg:text-2xl text-lg press-start text-center font-black"> {{ title }} </h2>
    </router-link>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String
    },
    url: {
        required: true,
        type: String
    }
})
</script>

<style scoped>

</style>