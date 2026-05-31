<template>
  <div ref="fullBar" class="relative rounded-full bg-white w-full h-[80%] px-[5%] my-[5%]"
  >
    <div ref="scoreBar" class="absolute rounded-full bg-sky-300 h-full top-0" :style="{
    width: `${width}%`,
    left: `${left}%`
  }"></div>
    <div ref="timerBar" id="TIMERBAR" class="absolute top-0 rounded-2xl bg-gray-500 w-[10px] h-full"></div>
  </div>
  <general-button :w="'w-[80%]'" :h="'h-[30px] rounded-full text-5xl'" @click="handleInput()"> PRESS! </general-button>
</template>

<script setup lang="ts">
const timerBar = ref<HTMLElement>()
const scoreBar = ref<HTMLElement>()
const emit = defineEmits(["lose"])
const score = ref<number>(0)

let width = ref<number>(30)
let left = ref<number>(5)

function handleInput() {
    let timerBarPlace:string = window.getComputedStyle(timerBar.value!).left

    let scoreBarWidth:string = window.getComputedStyle(scoreBar.value!).width
    let scoreBarPlace:string = window.getComputedStyle(scoreBar.value!).left
    // gets all of the placements and widths and stuff

    let vals:string[] = [timerBarPlace, scoreBarWidth, scoreBarPlace]
    let numVals:number[] = [0, 0, 0]
    vals.forEach((val, index) => {
        let numVal:number = Number(val.slice(0, -2))
        numVals[index] = numVal
    }) // converts strings (ex. "340px") into numbers (ex. 340), for comparison 

    if (
        ((numVals[0] as number) > (numVals[2] as number)) &&
        ((numVals[0] as number) < ((numVals[2] as number) + (numVals[1] as number)))
    ) { // if we within the goal
        width.value = width.value * .66
        left.value = Math.floor(Math.random() * (90 - width.value)) + 5

        if(!score.value) { // sets score
            score.value += 10
        } else {
            score.value *= 2
        }

    } else { // if you did not hit the goal
        emit("lose", score)
    }
}
</script>


<style scoped>
#TIMERBAR {
  animation: bounce-side 2.5s infinite linear alternate;
}

@keyframes bounce-side {
  0% {
    left: 5%;
  }
  100% {
    left: 95%;
  }
}
</style>