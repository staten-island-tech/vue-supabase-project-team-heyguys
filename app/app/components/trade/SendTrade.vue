<template>
    <div class="h-[86%] w-[90%] rounded-2xl flex flex-row justify-between">
        <div class="bg-slate-200 w-[49%] rounded-xl">
            <div class="bg-white w-full rounded-xl h-[25%] flex flex-col py-[2%] justify-between items-center px-[1%]">
                <h3 class="text-black press-start text-md lg:text-xl text-center"> Item Search </h3>
                <p class="text-[.6rem] italic text-center press-start text-sky-700">Search for users with this robot's parts</p>
                <label
            class="input px-0 flex flex-row justify-between items-center bg-white border-yellow-500 border-4 w-full rounded-3xl">
            <input v-model="itemInput" type="search" class="lg:w-[70%] w-full grow press-start text-black text-md px-[1%] pl-[5%]" placeholder="Search" />
            <GeneralButton :w="'w-[20%]'" :h="'aspect-[3/2] right'" @click="searchForItem()">></GeneralButton>
        </label>
            </div>
            <div v-if="Array.isArray(itemsFound)" class="justify-around m-[2%] mt-[5%] p-[3%] h-[65%] bg-white rounded-2xl border-yellow-400 border-2
            overflow-y-scroll scrollbar-gutter stable">
                <trade-no-item-found v-if="itemsFound.length === 0"></trade-no-item-found>
                <trade-item-card v-else v-for="el in itemsFound" :item="el"></trade-item-card>
            </div>
        </div>

        <div class="bg-slate-200 w-[49%] rounded-xl">
            <div class="bg-white w-full rounded-xl h-[25%] flex flex-col py-[2%] justify-between items-center px-[1%]">
                <h3 class="text-black press-start text-md lg:text-xl text-center"> User Search </h3>
                <p class="text-[.6rem] italic text-center press-start text-sky-700">Search for users by their email addresses</p>
                <label
            class="input px-0 flex flex-row items-center bg-white border-yellow-500 border-4 w-full rounded-3xl">
            <input v-model="userInput" type="search" class="lg:w-[70%] w-full grow press-start text-black text-md px-[1%] pl-[5%]" placeholder="Search" />
            <GeneralButton :w="'w-[20%]'" :h="'aspect-[3/2] right'" @click="searchForUser()"> ></GeneralButton>
            <!-- CHANGE THIS HERE HERE HERE-->
        </label>
            </div>

            <trade-user-card v-if="userFound?.email" :is-user="isUser" :email="userFound.email"></trade-user-card>
            <trade-no-user-found v-else-if="userFound === 0"></trade-no-user-found>

        </div>
    </div>
</template>

<script setup lang="ts">
import { getSupabase } from '~/lib/supabaseClient'
import { useLoginStore, type robotPart } from '#imports'

let itemInput = ref<string>("")
let userInput = ref<string>("")
let itemsFound = ref<null | any[]>(null)
let userFound = ref<any>(null)
let isUser = ref<boolean>(false)

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

function caseFix(text:string) {
    return text
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

async function getValidItems(validParts:PartIdLink[] ) {
    itemsFound.value = null
    const validIds:string[] = []
    validParts.forEach((part) => validIds.push(part.part_id))

    const supabase = getSupabase()
    const { data, error } = await supabase
    .from("owned_robot_parts")
    .select("*")
    .in("part_id", validIds)
    if(error) {
        console.error(error.message)
    } else {
        console.log(data)
        itemsFound.value = data
    }
}

async function searchForItem() {
    let itemSearch = ref<string>(caseFix(itemInput.value)) 
        const supabase = getSupabase() 
        const { data, error } = await supabase
        .from("robot_parts")
        .select("*")
        .eq("name", itemSearch.value)
    
        if(error) {
            console.error(error.message)
        } else {
            let validParts:PartIdLink[] = []
            data.forEach((validPart:robotPart) => {
                validParts.push({
                    part_id: validPart.part_id,
                    part: validPart
                } as PartIdLink)
            })
            getValidItems(validParts)
        }
}

</script>

<style scoped>

</style>