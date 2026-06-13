<template>
    <div
        class="fixed w-[90%] h-[90%] left-[5%] top-[5%] bg-slate-300/60 z-10  rounded-3xl border-yellow-500 border-2 p-[1%] flex flex-col">
        <div class="h-[10%] w-full flex justify-between">
            <general-button :w="'aspect-square'" :h="'h-full'" @click="$emit('close')">X</general-button>
            <general-button :w="'w-[60%]'" :h="'h-full lg:text-lg text-xs'" @click="reverseList()"> SORTED BY {{ sortType}} </general-button>
        </div>
        <div class="h-full w-full flex flex-col-reverse border-2 border-yellow-500 bg-white/60 rounded-2xl my-[1.5%] p-[2%] overflow-y-scroll">
            <gacha-history-item v-if="dataLoaded" v-for="item in gachaHistory" :part_id="item.part_id" :allItems="allItems"></gacha-history-item>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSupabase } from '~/lib/supabaseClient';
import { useLoginStore } from "#imports"

const emit = defineEmits(['close'])

const supabase = getSupabase()
const user = useLoginStore().loggedInUser

const gachaHistory = ref<HistoryPull[]>([])
const allItems = ref<robotPart[]>([])
const dataLoaded = ref<boolean>(false)
const isNewtOld = ref<boolean>(true)

const sortType = computed(() => {
    if(isNewtOld) return "NEWEST TO OLDEST"
    else return "OLDEST TO NEWEST"
})

function reverseList() {
    isNewtOld.value = !isNewtOld.value
    allItems.value = allItems.value.toReversed()
    console.log(allItems.value)
}

async function getTableInfo() {
    {
        const { data, error } = await supabase
        .from("gacha_history")
        .select("*")
        .eq("user_id", user?.id)
        gachaHistory.value = data.toReversed()
    }
    {
        const { data, error } = await supabase
        .from("robot_parts")
        .select("*")

        allItems.value = data
    }
    dataLoaded.value = true
}

getTableInfo()

</script>

<style scoped>

</style>