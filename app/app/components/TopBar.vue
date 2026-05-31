<template>
    <div class="flex justify-between items-center w-full h-[16vh] bg-gradient-to-t from-sky-700 to-sky-500 p-auto z-10 relative rounded-bl-xl rounded-br-xl">
        <div class="flex flex-col justify-center items-center mx-[2%]">
            <h1 class="font-black text-4xl lg:text-5xl press-start mb-0 text-center"> Build-a-bot! </h1>
            <h3 class="lg:text-lg text-md google-sans-code mt-0 text-yellow-400 italic"> by Humd Baig and Edward Mercado </h3>
        </div>
        <GeneralButton :w="'w-[20%]'" :h="'max-h-[60%] mx-[2%]'"
        @click="useLoginStore().logOut"
        >LOG OUT</GeneralButton>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>