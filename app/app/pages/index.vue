<template>
    <LoggedinHome v-if="loggedIn" @logout="loggedIn=false"></LoggedinHome>
    <LoggedoutHome v-else @login="loggedIn=true"></LoggedoutHome>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
const loggedIn:Ref<boolean> = ref(false)

const isLargeScreen:Ref<boolean> = useMediaQuery('(min-width: 1024px)')
const buttonClasses = computed(() => {
    if (isLargeScreen.value) return ['py-[2%]', 'pl-[2%]', 'w-[60%]']
    else return ['items-center', 'w-full', 'px-auto']
})
</script>

<style scoped></style>