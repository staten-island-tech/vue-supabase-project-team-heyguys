<template>
    <div class="m-[2%] lg:mt-[2%] mt-[5%] p-[3%] h-[65%] bg-white rounded-2xl border-yellow-400 border-2 flex justify-center items-center">
       <h3 class="press-start text-2xl text-black text-center">NO USER FOUND</h3>
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