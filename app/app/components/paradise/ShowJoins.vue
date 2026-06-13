<template>
    <div class="w-full min-h-[60%] border-2 border-white rounded-2xl p-[1%]">
        <h2 class="press-start text-purple-700 text-xl max-h-[12%]"> SUPABASE JOINS </h2>
        <div class="flex flex-row justify-between items-center h-[85%]">
            <GeneralButton :w="'w-[30%]'" :h="'h-full text-xs'" @click="sampleJoin()">LOG A SAMPLE JOIN (logs every owned part and its linked robot part)</GeneralButton>
            <div class="border-2 border-purple-900 overflow-y-scroll w-[65%] h-full rounded-2xl p-[1%] text-purple-900 font-bold press-start text-xs">
                {{ joinData.length ? joinData : "nothing yet..." }}
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { getSupabase } from '~/lib/supabaseClient';
const joinData = ref<any[]>([])

async function sampleJoin() {
    const supabase = getSupabase()
    const { data, error } = await supabase
    .rpc("join_owned_info")

    joinData.value = data.sort((a:any, b:any) => a.user_id.localeCompare(b.user_id))
}

</script>

<style scoped>

</style>