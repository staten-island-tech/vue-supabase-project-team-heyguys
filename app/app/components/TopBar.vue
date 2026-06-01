<template>
    <div class="flex justify-between items-center w-full h-[16vh] bg-gradient-to-t from-sky-700 to-sky-500 p-auto z-10 relative rounded-bl-xl rounded-br-xl">
        <div class="flex flex-col justify-center items-center mx-[2%]">
            <h1 class="font-black text-4xl lg:text-5xl press-start mb-0 text-center"> Build-a-bot! </h1>
            <h3 class="lg:text-lg text-md google-sans-code mt-0 text-yellow-400 italic"> by Humd Baig and Edward Mercado </h3>
        </div>
        <GeneralButton :w="'w-[20%]'" :h="'max-h-[60%] mx-[2%]'"
        @click="useLoginStore().logOut"
        >LOG OUT</GeneralButton>

        <div v-if="loginStore.loggedInUser" role="alert" class="alert alert-info bg-sky-300/50 absolute bottom-[-25%] left-[0.5%] z-10 h-[7%] flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current text-black">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

            <span class="text-bold press-start text-xs text-black italic">
                You are logged in as {{ loginStore.loggedInUser?.email }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const loginStore = useLoginStore()
</script>

<style scoped>

</style>