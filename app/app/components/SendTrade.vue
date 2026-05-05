<template>
    <div class="h-[86%] w-[90%] rounded-2xl flex flex-row justify-between">
        <div class="bg-slate-200 w-[49%] rounded-xl">
            <div class="bg-white w-full rounded-xl h-[20%] flex flex-col lg:py-0 py-[1%] lg:flex-row justify-between items-center px-[1%]">
                <h3 class="text-black press-start text-md lg:text-xl text-center lg:w-[20%]"> Item Search </h3>
                <label
            class="input pl-0 flex flex-row items-center bg-white border-yellow-500 border-4 h-[80%] w-full lg:w-[70%] rounded-3xl">
            <input v-model="itemSearch" type="search" class="lg:w-[70%] w-full grow press-start text-black text-md px-[1%] pl-[5%]" placeholder="Search" />
            <!-- CHANGE THIS HERE HERE HERE-->
        </label>
            </div>
        </div>
        <div class="bg-slate-200 w-[49%] rounded-xl">
            <div class="bg-white w-full rounded-xl h-[20%] flex flex-col lg:py-0 py-[1%] lg:flex-row justify-between items-center px-[1%]">
                <h3 class="text-black press-start text-md lg:text-xl text-center lg:w-[20%]"> User Search </h3>
                <label
            class="input pl-0 flex flex-row items-center bg-white border-yellow-500 border-4 h-[80%] lg:w-[70%] w-full rounded-3xl">
            <input v-model="userSearch" type="search" class="lg:w-[70%] w-full grow press-start text-black text-md px-[1%] pl-[5%]" placeholder="Search" />
            <!-- CHANGE THIS HERE HERE HERE-->
        </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
let itemSearch = ref<string>("")
let userSearch = ref<string>("")
</script>

<style scoped>

</style>