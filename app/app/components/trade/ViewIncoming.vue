<template>
    <div class="h-[86%] border-2 w-[90%] rounded-2xl bg-white">
        <div class="h-[85%] w-full flex flex-col justify-start items-center py-[1%]">
            <trade-request v-for="tradeObject in filteredTradeObjects"
            :tradeObject="tradeObject" v-if="tradeObjects.length > 0"
            @delete="(deleteEl:TradeObject) => deleteTrade(deleteEl)"
            @confirm="(tradeObject:TradeObject) => confirmTrade(tradeObject)"
            ></trade-request>
            <div class="press-start h-full w-full border-2 border-yellow-500 rounded-2xl flex items-center mx-[5%]" v-else>
                <h2 class="text-4xl w-full text-black flex items-center justify-center text-center">
                    NO TRADES FOUND
                </h2>
            </div>
        </div>
        <TradePagination :pageNum="tradeObjects.length ? pageNum : 0" :pageCount="Math.ceil(tradeObjects.length / 3)"
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
        if(trade.receiver === useLoginStore().loggedInUser?.id) {
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
        }
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

async function confirmTrade(tradeObject:TradeObject) {
    const ownedPartData:ownedRobotPart[] = await getTableData('owned_robot_parts')
    const supabase = getSupabase()

    if(
        !(ownedPartData.find((ownedPart) => ownedPart.uuid === tradeObject.offerOwnedPart?.uuid)) || 
        !(ownedPartData.find((ownedPart) => ownedPart.uuid === tradeObject.requestOwnedPart?.uuid)) // if you dont have that part anymore for whatever reason
    ) {
        console.log("ERROR: This trade cannot be processed.")
        await deleteTrade(tradeObject)
        return
    } else {
        deleteTrade(tradeObject)
        const offerPart:ownedRobotPart = ownedPartData.find((ownedPart:ownedRobotPart) => ownedPart.uuid === tradeObject.offerOwnedPart?.uuid)!
        const requestPart:ownedRobotPart = ownedPartData.find((ownedPart:ownedRobotPart) => ownedPart.uuid === tradeObject.requestOwnedPart?.uuid)!
        
        const reverseOfferPart:(ownedRobotPart | undefined) = ownedPartData.find( // if the person on the other end of the trade has that item
            (ownedPart:ownedRobotPart) => 
            ownedPart.part_id === tradeObject.offerPart?.part_id
            && ownedPart.user_id === tradeObject.receiver)
        const reverseRequestPart:(ownedRobotPart | undefined) = ownedPartData.find( // if the person on the other end of the trade has that item
            (ownedPart:ownedRobotPart) => 
            ownedPart.part_id === tradeObject.requestPart?.part_id
            && ownedPart.user_id === tradeObject.sender)

        const parts:ownedRobotPart[] = [offerPart, requestPart]
        const reverseParts:(ownedRobotPart | undefined)[] = [reverseOfferPart, reverseRequestPart]

        parts.forEach(async (part:ownedRobotPart, index) => {
            part.quantity = Math.max(part.quantity-1, 0)

            // remove from current inventory

            if(part.quantity === 0) {
                const { data, error } = await supabase
                .from("owned_robot_parts")
                .delete()
                .eq("uuid", part.uuid)
            } else {
                const { data, error } = await supabase
                .from("owned_robot_parts")
                .update({
                    "quantity": part.quantity
                })
            }   

        })

        reverseParts.forEach(async (reversePart:(ownedRobotPart | undefined), index) => {
            if(reversePart) {
                const { data, error } = await supabase
                .from("owned_robot_parts")
                .update({
                    "quantity": reversePart.quantity ++
                })
            } else if (!index) {
                const { data, error } = await supabase
                .from("owned_robot_parts")
                .insert({
                    part_id: tradeObject.offerOwnedPart?.part_id,
                    user_id: tradeObject.receiver,
                    completed_robot_id: null,
                    quantity: 1
                })
                if(error) console.error(error.message)
            } else {
                const { data, error } = await supabase
                .from("owned_robot_parts")
                .insert({
                    part_id: tradeObject.requestOwnedPart?.part_id,
                    user_id: tradeObject.sender,
                    completed_robot_id: null,
                    quantity: 1
                })
                if(error) console.error(error.message)
            }
        })
    }
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