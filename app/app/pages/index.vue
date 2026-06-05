<template>
    <BackgroundRects v-if="isLargeScreen"></BackgroundRects>
    <div v-else class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-full w-full -translate-y-[2%]"></div>
    <div class="flex flex-row h-[85vh] w-full z-10">
        <div class="h-full flex flex-col justify-around z-10 pl-[5%] -pr-[5%]" :class="buttonClasses">
            <MenuButton :url="'/inventory'" :title="'Inventory'"></MenuButton>
            <MenuButton :url="'/junkyard-gacha'" :title="'Gacha'"></MenuButton>
            <MenuButton :url="'/trading'" :title="'Trading'"></MenuButton>
            <MenuButton :url="'/money-game'" :title="'Get Money'"></MenuButton>
        </div>
        <div class="hidden lg:flex lg:w-[70%] h-full bg-gray-300 items-center justify-end">
            <div class="w-[80%] h-[80%] bg-black"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
const emit = defineEmits(['logout'])
const isLargeScreen:Ref<boolean> = useMediaQuery('(min-width: 1024px)')
const buttonClasses = computed(() => {
    if (isLargeScreen.value) return ['py-[2%]', 'pl-[2%]', 'w-[60%]']
    else return ['items-center', 'w-full', 'px-auto']
})
</script>

<style scoped></style>