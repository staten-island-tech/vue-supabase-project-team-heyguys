<template>
    <router-link to="/" class="bg-white border-2 border-yellow-500 press-start text-yellow-500 h-full w-[35%] flex items-center justify-center rounded-2xl text-2xl text-center
            transition-all ease-in-out duration-300 hover:bg-yellow-400/95 hover:text-white hover:-translate-y-[5%] hover:border-2 hover:border-orange-500
            active:bg-yellow-300 active:translate-y-[5%]
            " @click="sound.play()"
            >Back Home</router-link>
</template>

<script setup lang="ts">
import { Howl, Howler } from 'howler'

var sound = new Howl({
    src: ['/sounds/click.mp3'],
    volume: 0.6
})
</script>

<style scoped>

</style>