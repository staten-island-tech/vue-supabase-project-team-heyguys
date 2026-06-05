<template>
    <div
        class="fixed w-[90%] h-[90%] left-[5%] top-[5%] bg-slate-300/60 z-10  rounded-3xl border-yellow-500 border-2 p-[1%] flex flex-col justify-between py-[1%]">
        <!-- TITLE STUFF -->
        <div class="w-full h-[14%] flex flex-col justify-between">
            <div class="w-full h-[70%] flex flex-row justify-between items-center">
                <general-button :w="'aspect-square'" :h="'h-full'" @click="$emit('close')">X</general-button>
                <div class="h-full flex items-center bg-yellow-500 px-[3%] rounded-2xl border-white border-2">
                    <h3 class="text-md press-start w-full text-white">EMAIL: <span
                            class="italic lg:text-lg text-[.6rem]">{{ user.email }}</span></h3>
                </div>
            </div>
            <div class="w-full h-[17%] rounded-full bg-yellow-500"></div>
        </div>

        <!-- INVENTORY-->
        <div class="w-full h-[85%] border-2 border-yellow-500 rounded-2xl bg-white/70 
        overflow-y-scroll p-[2%]" v-if="viewMode === 'recipient inventory'">
            <h2 class="text-center text-black press-start text-lg lg:text-2xl mb-[3%]">{{ user.email }}'s INVENTORY</h2>
            <trade-user-owned-part v-for="partLink in recipientPartLinks" :isRecipient="true" :partLink="partLink"
                @next="(part: PartIdLink) => { viewMode = 'sender inventory'; receivePart = part }"
                v-if="recipientPartLinks.length > 0"></trade-user-owned-part>
                <div class="border-yellow-500 border-2 rounded-2xl w-full h-full flex justify-center items-center" v-else>
                    <h2 class="press-start text-black text-center text-2xl">NO ITEMS FOUND</h2>
                </div>
        </div>

        <div class="w-full h-[85%] border-2 border-yellow-500 rounded-2xl bg-white/70 
        overflow-y-scroll p-[2%]" v-else-if="viewMode === 'sender inventory'">
            <h2 class="text-center text-black press-start text-lg lg:text-2xl mb-[3%]">YOUR INVENTORY</h2>
            <trade-user-owned-part v-for="partLink in senderPartLinks" :isRecipient="false" :partLink="partLink"
                @next="(part: PartIdLink) => { viewMode = 'confirm trade'; sendPart = part }"
                v-if="senderPartLinks.length > 0"></trade-user-owned-part>
                <div class="border-yellow-500 border-2 rounded-2xl w-full h-full flex justify-center items-center" v-else>
                    <h2 class="press-start text-black text-center text-2xl">NO ITEMS FOUND</h2>
                </div>
        </div>

        <div class="w-full h-[85%] border-2 border-yellow-500 rounded-2xl bg-white/70 
        overflow-y-scroll p-[2%]" v-else-if="viewMode === 'confirm trade'">
            <trade-confirm-request 
            :sendPart="sendPart as PartIdLink" 
            :receivePart="receivePart as PartIdLink" :receiverEmail="user.email"
            @confirm="(sendPart:PartIdLink, receivePart:PartIdLink) => $emit('confirm', sendPart, receivePart)"
            ></trade-confirm-request>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSupabase } from '~/lib/supabaseClient'
import { useLoginStore } from '#imports';

const props = defineProps<{ user: any }>()
const emit = defineEmits(['confirm', 'close'])

const supabase = getSupabase()
const viewMode = ref<string>('recipient inventory')
const recipientPartLinks = ref<PartIdLink[]>([]) // a collection of part ids and parts in the inventories
const senderPartLinks = ref<PartIdLink[]>([])
const receivePart = ref<PartIdLink | null>(null) // the parts you will receive and send
const sendPart = ref<PartIdLink | null>(null)

async function getData(isReceiver: boolean) {
    const { data, error } = await supabase
        .from("owned_robot_parts")
        .select("*")
        .eq("user_id", isReceiver ? props.user.user_id : useLoginStore().loggedInUser?.id)
    if (error) {
        console.error(error.message)
        return error.message
    } else return data as ownedRobotPart[]
}

async function getParts(userData: ownedRobotPart[], isReceiver: boolean) {
    const { data, error } = await supabase
        .from("robot_parts")
        .select("*")

    if (error) {
        console.error(error.message)
    } else {
        if (isReceiver) {
            userData.forEach((value) => {
                if (!value.completed_robot_id) {
                    let ownedPart = data.find((part: ownedRobotPart) => part.part_id === value.part_id)
                    recipientPartLinks.value.push({
                        part_id: value.user_id,
                        part: ownedPart
                    })

                    recipientPartLinks.value.sort((a: PartIdLink, b: PartIdLink) => a.part.name.localeCompare(b.part.name))
                }
            })
        } else {
            userData.forEach((value) => {
                if (!value.completed_robot_id) {
                    let ownedPart = data.find((part: ownedRobotPart) => part.part_id === value.part_id)
                    senderPartLinks.value.push({
                        part_id: value.user_id,
                        part: ownedPart
                    })

                    senderPartLinks.value.sort((a: PartIdLink, b: PartIdLink) => a.part.name.localeCompare(b.part.name))
                }
            })
        }
    }
}

onMounted(async () => {
    getParts(await getData(true), true)
    getParts(await getData(false), false)
})

</script>

<style scoped></style>