<template>
    <div class="w-[97%] bg-slate-200 h-[30%] rounded-2xl flex lg:flex-row flex-col justify-between items-center pl-[1%] py-[1%] my-[0.8%]">
        <h3 class="text-black press-start lg:text-md text-lg break-all lg:w-[30%] w-full text-center"> {{ tradeObject.senderEmail }} </h3>

        <div class="lg:w-[80%] w-full h-[90%] flex flex-row justify-around items-center">
            <div class="bg-sky-800 h-[90%] aspect-square rounded-2xl border-blue-950 border-4 flex flex-row justify-around items-center">
                <div class="w-[80%] aspect-square bg-white text-black text-[.6rem] break-all">
                    <img :src="tradeObject.offerPart?.sprite_url" :alt="tradeObject.offerPart?.name" class="w-full h-full object-contain">
                </div>
            </div>
            <h3 class="text-black press-start lg:text-xl text-md text-center"> FOR YOUR </h3>
            <div class="bg-yellow-400 border- h-[90%] aspect-square rounded-2xl border-yellow-500 border-4 flex flex-row justify-around items-center">
                <div class="w-[80%] aspect-square bg-white text-black text-[.6rem] break-all">
                    <img :src="tradeObject.requestPart?.sprite_url" :alt="tradeObject.requestPart?.name" class="w-full h-full object-contain">
                </div>
            </div>

            <div class="w-[20%] flex flex-row justify-between h-full">
                <button class="aspect-square bg-green-400 border-emerald-900 border-2 w-[48%] rounded-xl
                hover:bg-green-500 active:bg-green-700 font-black text-xl
                ease-in-out duration-300 hover:-translate-y-[2%] active:translate-y-[2%]
                " @click="$emit('confirm', tradeObject)"> ✓ </button>
                <button class="aspect-square bg-red-400 border-2 border-red-900 w-[48%] rounded-xl font-black text-xl
                hover:bg-red-500 active:bg-red-700
                ease-in-out duration-300 hover:-translate-y-[2%] active:translate-y-[2%]
                " @click="$emit('delete', tradeObject)"
                > ✖ </button>
                
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['delete', 'confirm'])

defineProps<{tradeObject: TradeObject}>()
</script>

<style scoped>

</style>