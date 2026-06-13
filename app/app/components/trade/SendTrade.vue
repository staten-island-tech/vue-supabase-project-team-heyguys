<template>
    <div class="h-[86%] w-[90%] rounded-2xl flex flex-row justify-between">
        <Transition name="user-modal">
            <trade-user-modal v-if="viewInventory" 
            @close="viewInventory = false" :user="userFound"
            @confirm="(sendPart:PartIdLink, receivePart:PartIdLink) => createTrade(sendPart, receivePart)"
            ></trade-user-modal>
        </Transition>
        
        <div class="bg-slate-200 w-full rounded-xl">
            <div class="bg-white w-full rounded-xl h-[25%] flex flex-col py-[2%] justify-between items-center px-[1%]">
                <h3 class="text-black press-start text-md lg:text-lg text-center"> User Search: <span class="lg:text-lg text-md italic text-center press-start text-sky-700">Search for users by their email addresses</span> </h3>
                <label
            class="input px-0 flex flex-row items-center bg-white border-yellow-500 border-4 w-full rounded-3xl">
            <input v-model="userInput" type="search" class="lg:w-[70%] w-full grow press-start text-black text-md px-[1%] pl-[5%]" placeholder="Search" />
            <GeneralButton :w="'w-[20%]'" :h="'aspect-[3/2] right'" @click="searchForUser()"> ></GeneralButton>
            <!-- CHANGE THIS HERE HERE HERE-->
        </label>
            </div>

            <trade-user-card v-if="userFound?.email" :is-user="isUser" :email="userFound.email"
            @viewInventory="viewInventory = true"
            ></trade-user-card>

            <trade-no-user-found v-else-if="userFound === 0"></trade-no-user-found>

        </div>
    </div>
</template>

<script setup lang="ts">
import { getSupabase } from '~/lib/supabaseClient'
import { useLoginStore } from '#imports'

let userInput = ref<string>("")
let userFound = ref<any>(null)
let isUser = ref<boolean>(false)
let viewInventory = ref<boolean>(false)

async function searchForUser() {
    userFound.value = null
    let userSearch = ref<string>((userInput.value).toLowerCase())
    const supabase = getSupabase() 
    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", userSearch.value)
    .single()
    
    if(error) {
        console.error(error.message)
    } else if (data.email === useLoginStore().loggedInUser?.email) {
        userFound.value = data
        isUser.value = true
    } else {
        userFound.value = data
        isUser.value = false
    }
    if(!data) {
        userFound.value = 0
    }
}

async function createTrade(sendPart:PartIdLink, receivePart:PartIdLink) {
    viewInventory.value = false
    console.log(sendPart.part)
    console.log(receivePart.part)
    console.log(useLoginStore().loggedInUser?.id)
    console.log(userFound.value.user_id)

    const supabase = getSupabase()
    const {data, error} = await supabase
    .from("trades")
    .insert({
        'sender': useLoginStore().loggedInUser!.id,
        'receiver': userFound.value.user_id,
        'offer': sendPart.part.part_id,
        'request': receivePart.part.part_id
    })

    if(error) {
        console.error(error.message)
    }
}  

</script>

<style scoped>
.user-modal-enter-from {
    opacity: 0;
    transform: translateY(200%) translateX(100%) scale(0)
}

.user-modal-enter-active {
    transition: all 0.3s ease-in-out;
}

.user-modal-enter-to {
    opacity: 1;
    transform: translateY(0%) scale(1)
}

.user-modal-leave-from {
    opacity: 1;
    transform: translateY(0%) scale(1)
}

.user-modal-leave-active {
    transition: all 0.3s ease-in-out;
}

.user-modal-leave-to {
    opacity: 0;
    transform: translateY(200%) translateX(100%) scale(0)
}
</style>