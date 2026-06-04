<template>
    <div class="h-[86%] border-2 w-[90%] rounded-2xl bg-white">
        <div class="h-[85%] w-full flex flex-col justify-start items-center py-[1%]">
            <trade-request v-for="tradeObject in filteredTradeObjects"
            :tradeObject="tradeObject"
            @delete="(deleteEl:TradeObject) => deleteTrade(deleteEl)"
            ></trade-request>
        </div>
        <TradePagination :pageNum="pageNum" :pageCount="Math.ceil(tradeObjects.length / 3)"
        @back="() => { if(pageNum) pageNum=Math.max(pageNum-1, 1) }"
        @forward="pageNum=Math.min(pageNum+1, Math.ceil(tradeObjects.length / 3))"
        ></TradePagination>
    </div>
</template>

<script setup lang="ts">
import { getSupabase } from '~/lib/supabaseClient'

const tradeObjects = ref<TradeObject[]>([])

const pageNum:Ref<number> = ref(1)

defineProps({
    requests: {
        type: Array,
        required: true
    }
})

async function getTableData(columnName:string) {
    const supabase = getSupabase()
    const { data, error } = await supabase
    .from(columnName)
    .select(`*`)
    
    if(error) {
        console.error(error)
    } return data
}

async function linkEverything() {
    const tradeData = await getTableData("trades")
    const userData = await getTableData('users')
    const ownedPartData = await getTableData('owned_robot_parts')
    const partData = await getTableData('robot_parts')

    tradeData.forEach((trade:any) => {
        tradeObjects.value.push({ // it aint pretty but life aint always pretty either.
            uuid: trade.uuid,
            receiver: trade.receiver,
            sender: trade.sender,
            offer: trade.offer,
            request: trade.request,

            offerPart: partData.find((part:robotPart) => part.part_id === trade.offer),
            requestPart: partData.find((part:robotPart) => part.part_id === trade.request),

            senderEmail: userData.find((user:any) => user.user_id === trade.sender).email,
            offerOwnedPart: ownedPartData.find((part:ownedRobotPart) => part.part_id === trade.offer && part.user_id === trade.sender && !part.completed_robot_id), 
            requestOwnedPart:  ownedPartData.find((part:ownedRobotPart) => part.part_id === trade.request && part.user_id === trade.receiver && !part.completed_robot_id),
        })
    })
    console.log(tradeObjects.value)
}

async function deleteTrade(tradeObject:TradeObject) {
    const supabase = getSupabase()
    const { data, error } = await supabase
    .from("trades")
    .delete()
    .eq("uuid", tradeObject.uuid)

    if(error) {
        console.error(error.message)
    } 

    tradeObjects.value = tradeObjects.value.filter((el) => el !== tradeObject)
    if(!(tradeObjects.value.length % 3) && (Math.floor(tradeObjects.value.length / 3) < pageNum.value)) { pageNum.value -= 1 }
}

const filteredTradeObjects = computed(() => {
    return tradeObjects.value.filter((el, index) => Math.floor(index / 3) === pageNum.value - 1)
})

onMounted(async () => {
    await linkEverything()
})

</script>

<style scoped>

</style>