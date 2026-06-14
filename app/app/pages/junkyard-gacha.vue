<template>
    <Transition name="gacha-history">
        <gacha-history v-if="showHistory" @close="showHistory = false"></gacha-history>
    </Transition>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h2 class="text-4xl text-yellow-500 press-start"> JUNKYARD GACHA </h2>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div
            class="flex flex-col justify-between items-center bg-slate-300/60 z-10 w-[80%] h-[75%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <div class="w-full h-[30%] flex flex-col justify-around items-center">
                <div class="w-full h-[20%] flex items-center justify-center">
                    <h4 class="text-center press-start">
                        YOUR BALANCE: ${{ user.money }}
                    </h4>
                </div>
                <div class="h-[40%] w-full flex flex-row justify-around items-center my-[2%]">
                    <general-button :w="'w-[45%]'" :h="'h-full'" class="justify-around lg:flex-row flex-col"
                        @click="rollGacha(1, 20)"> Pull One <gacha-price-tag :text="'$20'"></gacha-price-tag>
                    </general-button>
                    <general-button :w="'w-[45%]'" :h="'h-full'" class="justify-around lg:flex-row flex-col"
                        @click="rollGacha(10, 180)"> Pull Ten <gacha-price-tag :text="'$180'"></gacha-price-tag>
                    </general-button>
                </div>
            </div>
            <Transition name="result-page">
                <results-page v-if="showResults" :results="results" class="my-[1%]">
                </results-page>
            </Transition>
            <div class="h-[10%] w-full flex justify-center items-center">
                <general-button :w="'w-full lg:w-[75%]'" :h="'h-[90%]'" @click="showHistory = true">
                    VIEW GACHA HISTORY
                </general-button>
            </div>
        </div>

        <div v-if="showError" role="alert" class="alert alert-error fixed bottom-[4%] left-[2%] z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <span class="text-bold press-start">Error: You cannot afford this. </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import GachaHistory from '~/components/gacha/GachaHistory.vue'
import ResultsPage from '~/components/gacha/ResultsPage.vue'

import { getSupabase } from '~/lib/supabaseClient'

const showError = ref<boolean>(false)

const user = ref(await useLoginStore().getUserData())

if (!useGachaStore().initialized) {
    await useGachaStore().initialize()
}

const showResults = ref<boolean>(false)
const results = ref<ResultType[]>([])
const showHistory = ref<boolean>(false)

let ownedRobotData: ownedRobotPart[] = []

const supabase = getSupabase()

async function addToHistory(part_id:string) {
    const { data, error } = await supabase
    .from('gacha_history')
    .insert({
        "part_id": part_id,
        "user_id": user.value.user_id
    })

    if(error) console.error(error.message)
}

async function rollGacha(numRolls: number, cost: number) {
    await supabase
        .from('owned_robot_parts')
        .select("*")
        .eq('user_id', user.value.user_id)
        .then((ownedRobots: object, error: Error) => {
            if (error) {
                console.error(error.message)
            } else {
                ownedRobotData = (ownedRobots as any).data
            }
        })

    if (user.value.money >= cost) {
        showError.value = false
        showResults.value = false
        await nextTick() // so that it unloads to reload again
        results.value = []
        for (let i = 0; i < numRolls; i++) {
            const result = useGachaStore().getRandomItem()
            results.value.push(result)

            const existingItem = ownedRobotData.find(
                (item: ownedRobotPart) =>
                    item.part_id === result.part_id &&
                    item.user_id === user.value.user_id &&
                    item.completed_robot_id === null
            )

            if (existingItem) {
                const {data, error} = await supabase
                .from('owned_robot_parts')
                .update({
                    ["quantity"]: existingItem.quantity+ 1
                })
                .eq("user_id", existingItem.user_id)
                .eq("part_id", existingItem.part_id)
                .select()

            } else {

                ownedRobotData.push({
                    user_id: user.value.user_id,
                    part_id: result.part_id,
                    completed_robot_id: null,
                    quantity: 1
                } as ownedRobotPart) // adds locally

                const { data, error } = await supabase // adds to database
                    .from('owned_robot_parts')
                    .insert({
                        user_id: user.value.user_id,
                        part_id: result.part_id,
                        completed_robot_id: null,
                        quantity: 1
                    })
            }
            addToHistory(result.part_id)
        }
        showResults.value = true

        user.value.money -= cost
        useLoginStore().updateUserData("money", user.value.money)
        await useInventoryStore().refreshInventory()
    } else showError.value = true
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

/* ---------------- */

.gacha-history-enter-from {
    opacity: 0;
    transform: translateY(200%) translateX(100%) scale(0)
}

.gacha-history-enter-active {
    transition: all 0.3s ease-in-out;
}

.gacha-history-enter-to {
    opacity: 1;
    transform: translateY(0%) scale(1)
}

.gacha-history-leave-from {
    opacity: 1;
    transform: translateY(0%) scale(1)
}

.gacha-history-leave-active {
    transition: all 0.3s ease-in-out;
}

.gacha-history-leave-to {
    opacity: 0;
    transform: translateY(200%) translateX(100%) scale(0)
}
</style>