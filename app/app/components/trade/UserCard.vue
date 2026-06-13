<template>
    <div class="justify-around mx-[2%] mt-[2%] p-[3%] h-[65%] bg-white rounded-2xl border-yellow-400 border-2">
        <div v-if="!isUser" class="flex flex-col w-full h-full justify-between">
            <div class="h-[50%]">
                <h3 class="text-black text-xl press-start w-full break-all">EMAIL:</h3>
                <h3 class="text-yellow-400 italic text-md press-start w-full break-all">{{email}}</h3>
            </div>
            <GeneralButton :w="'w-full'" :h="'h-[20%]'"
            @click="$emit('viewInventory')"
            >VIEW THEIR INVENTORY</GeneralButton>
        </div>
        <div v-else class="flex flex-col w-full h-full justify-center items-center">
            <div>
                <h3 class="text-black text-2xl press-start w-full break-words text-center">... This is already you?</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{email: String; isUser: boolean}>()
const emit=defineEmits(['viewInventory'])
</script>

<style scoped>

</style>