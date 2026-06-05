<template>
<div  class="w-full h-full flex justify-center items-center flex-col">
    <h3 class="press-start text-2xl text-black text-center" >NO VALID ITEMS FOUND</h3>
</div>
</template>

<script setup lang="ts">
import { Howl, Howler } from 'howler'

const whoop = new Howl({
    src: ['/sounds/whoo.mp3']
})

onMounted(() => {
    whoop.play()
})
</script>

<style scoped>

</style>