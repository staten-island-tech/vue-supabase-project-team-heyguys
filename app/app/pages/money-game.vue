<template>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h3 class="text-2xl text-center justify-start text-white press-start mt-12 mb-12"> YOUR MONEY: ${{ user.money }} </h3>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div class="flex flex-col items-center bg-slate-300/60 z-10 w-[80%] h-[80%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <h2 class="text-4xl justify-start text-yellow-500 press-start text-left"> TENTATIVE MADNESS </h2>
            <h3 class="text-2xl text-center justify-start text-yellow-200 press-start mt-12 mb-12"> To play, press the button when the bars match up!</h3>
            <play-game-bar v-if="playing" @lose="(playedScore) => lose(playedScore)"></play-game-bar>
            <play-game-idle v-else @play="playing = true" :score="score"></play-game-idle>
        </div>
        
        </div>
</template>

<script setup lang="ts">
import { Howl, Howler } from 'howler'

const sound = new Howl({
    src: ['/sounds/explode.mp3']
})

const score = ref<number | string>("N/A")
const playing = ref<boolean>(false)

const user = await useLoginStore().getUserData()

async function lose(playedScore:number) {
    playing.value = false; 
    score.value = playedScore
    user.money += playedScore

    sound.play()

    useLoginStore().updateUserData("money", user.money)
}

</script>

<style scoped>

</style>