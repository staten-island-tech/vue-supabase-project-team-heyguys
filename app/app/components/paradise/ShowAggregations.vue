<template>
    <div class="w-full min-h-[60%] border-2 border-white rounded-2xl p-[1%]">
        <h2 class="press-start text-purple-700 text-xl max-h-[12%]"> SUPABASE AGGREGATIONS </h2>
        <div class="flex flex-row justify-between items-center h-[85%]">
            <GeneralButton :w="'w-[30%]'" :h="'h-full text-xs break-words flex-col'" @click="sampleAggregation()">LOG A SAMPLE <span class="break-all"> AGGREGATION </span> (see every robot's base stat total) </GeneralButton>
            <div  class="border-2 border-purple-900 overflow-y-scroll w-[65%] h-full rounded-2xl p-[1%] text-purple-900 font-bold press-start text-xs">
                {{ aggregationData.length ? aggregationData : "nothing yet..." }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSupabase } from '~/lib/supabaseClient';

const aggregationData = ref<any[]>([])

async function sampleAggregation() {
    const supabase = getSupabase()

    const { data, error } = await supabase
    .rpc("get_robot_stat_totals")

    aggregationData.value = data
}
</script>

<style scoped>

</style>