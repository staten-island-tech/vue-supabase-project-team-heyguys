<template>
    <div class="w-full border-yellow-500 border-2 mb-[3%] rounded-2xl h-[20%] p-[2%] flex items-center justify-between">
        <h4 class="press-start text-black">{{  partLink.part.name }}'s {{ partLink.part.body_part }}</h4>
        <GeneralButton :w="'px-[2%] max-w-[50%] text-md lg:text-2xl'" :h="'h-full py-[2%]'"
        @click="$emit('next', partLink)">
        <span v-if="isRecipient">REQUEST</span>
        <span v-else>OFFER</span>
    </GeneralButton>
    </div>
</template>

<script setup lang="ts">
const props=defineProps<{partLink: PartIdLink, isRecipient:boolean}>()

const emit = defineEmits(['next'])
</script>

<style scoped>

</style>