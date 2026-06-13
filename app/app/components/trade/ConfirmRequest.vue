<template>
    <div class="flex flex-col items-center w-full h-full justify-between">
        <h2 class="press-start text-black lg:text-xl text-sm text-center h-[10%] flex items-center">CONFIRM TRADE (CANNOT BE UNSENT)</h2>
        <div class="flex lg:flex-row flex-col items-center justify-between w-full h-[78%] border-2 rounded-2xl border-yellow-500 p-[2%]">

            <div class="bg-white/80 lg:w-[40%] lg:h-full w-full h-[60%] rounded-2xl border-yellow-500 border-2">
                <h2 class="press-start lg:text-lg text-sm w-full text-black text-center lg:mt-[4%] mt-[2%] px-[2%] break-all lg:h-[15%] h-[5%] flex justify-center items-center">{{ receiverEmail }}'s</h2>
                <div class="lg:h-[70%] h-[65%] mt-[1%] border-2 border-yellow-500 rounded-2xl mx-[1%] flex justify-center items-center p-[3%]">
                    <h3 class="press-start text-black lg:text-2xl text-xl break-words text-center">{{ receivePart.part.name }}'s {{ receivePart.part.body_part }}</h3>
                </div>
            </div>

                <h2 class="press-start lg:text-4xl text-xl text-black text-center lg:m-[5%] m-[2%]">FOR</h2>

            <div class="bg-white/80 lg:w-[40%] lg:h-full w-full h-[60%] rounded-2xl border-yellow-500 border-2">
                <h2 class="press-start lg:text-lg text-sm w-full text-black text-center lg:mt-[4%] mt-[2%] mx-[1%] break-all lg:h-[15%] h-[5%] flex justify-center items-center">YOUR</h2>
                <div class="lg:h-[70%] h-[65%] mt-[1%] border-2 border-yellow-500 rounded-2xl mx-[1%] flex justify-center items-center p-[3%]">
                    <h3 class="press-start text-black lg:text-2xl text-xl break-words text-center">{{ sendPart.part.name }}'s {{ sendPart.part.body_part }}</h3>
                </div>
            </div>
        </div>
        <GeneralButton :w="'w-full'" :h="'max-h-[10%] mt-[2%]'"
        @click="$emit('confirm', sendPart, receivePart)"
        >SEND TRADE REQUEST</GeneralButton>
    </div>
</template>

<script setup lang="ts">
defineProps<{sendPart:PartIdLink, receivePart:PartIdLink, receiverEmail:string}>()
const emit=defineEmits(['confirm'])
</script>

<style scoped>

</style>