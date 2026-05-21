<template>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h2 class="text-4xl text-yellow-500 press-start"> JUNKYARD GACHA </h2>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div class="flex flex-col justify-between items-center bg-slate-300/60 z-10 w-[80%] h-[75%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <div class="w-full h-[30%] flex flex-col justify-around">
                <div class="w-full h-[20%] flex items-center justify-center">
                    <h4 class="text-center press-start">
                        YOUR BALANCE: INF MONEY
                    </h4>
                </div>
                <div class="h-[40%] w-full flex flex-row justify-around items-center my-[2%]">
                    <general-button :w="'w-[45%]'" :h="'h-full'" class="justify-around lg:flex-row flex-col"
                    @click="rollGacha(1)"
                    > Pull One  <PriceTag :text="'$20'"></PriceTag>
                    </general-button>
                    <general-button :w="'w-[45%]'" :h="'h-full'" class="justify-around lg:flex-row flex-col"
                    @click="rollGacha(10)"
                    > Pull Ten  <PriceTag :text="'$180'"></PriceTag>
                    </general-button>
                </div> 
            </div>
            <Transition name="result-page">
                <results-page v-if="showResults" :results="results">
                </results-page>
            </Transition>

        </div>
    </div>
</template>

<script setup lang="ts">

const showResults:Ref<boolean> = ref(false)
const results:Ref<any[]> = ref([])

async function rollGacha(numRolls:number) {
    showResults.value = false
    await nextTick() // so that it unloads to reload again
        results.value = []
    for(let i=0;i<numRolls;i++) {
        results.value.push(i)
        // make this be the random function instead
    }
    showResults.value = true
}

</script>

<style scoped>
.result-page-enter-from {
    opacity: 0;
    transform: translateX(200%)
}
.result-page-enter-active {
    transition: all 0.5s ease-out;
}
.result-page-enter-to {
    opacity: 1;
    transform: translateX(0%)
}
</style>