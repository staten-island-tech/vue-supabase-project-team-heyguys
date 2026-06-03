<template>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h2 class="text-4xl text-yellow-500 press-start"> TRADE </h2>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div class="flex flex-col justify-between items-center bg-slate-300/60 z-10 w-[80%] h-[75%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <div class="flex flex-row w-[90%] h-[12%] justify-between items-center">
                <GeneralButton :w="'w-[49%]'" :h="'h-full'" @click="mode='send trade'">Send a Trade</GeneralButton>
                <GeneralButton :w="'w-[49%]'" :h="'h-full'" @click="mode='view incoming'">View Trades</GeneralButton>
            </div>
            <trade-view-incoming v-if="mode==='view incoming'" :requests="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"></trade-view-incoming>
            <trade-send-trade v-else-if="mode==='send trade'"></trade-send-trade>
        </div>
    </div>
</template>

<script setup lang="ts">
let mode = ref<string | null>(null)


</script>

<style scoped>

</style>