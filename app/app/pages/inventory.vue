<template>
     <div>
  </div>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h2 class="text-4xl text-yellow-500 press-start"> YOUR INVENTORY </h2>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div class="flex flex-col justify-between items-center bg-slate-300/60 z-10 w-[80%] h-[80%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <div class = "flex flex-row justify-between w-full h-full">
            <div class = "inventory h-[65vh] w-[40vw] rounded-2xl flex justify-start flex-col items-center bg-gray-100 mx-[1%] mb-2">
                <div class ="menu flex flex-1 flex-col justify-between items-center space-x-0">
                <inventory-filter-menu :filters="filters" 
                @use-filter="(newFilter) => currentFilter = newFilter"
                />
                </div>
                <div class="w-[95%] h-[2%] rounded-full bg-yellow-400"></div>
                <div class="h-full w-full flex flex-wrap flex-row gap-6 items-center justify-center p-2 overflow-y-scroll scrollbar-gutter stable pt-6"> 
                    <inventory-item-box v-for="item in filteredItemBoxProps" 
                    :item="item" v-if="filteredItemBoxProps.length > 0"/>
                    <div class="border-yellow-500 border-2 rounded-2xl w-full h-full flex justify-center items-center"
                    v-else>
                        <h2 class="press-start text-black text-center text-2xl">NO ITEMS FOUND</h2>
                    </div>
                </div>
            </div>
            <div class="flex flex-col justify-around mb-[-10] w-300px">
                <button class="bg-white flex border-yellow-500 border-2 text-2xl rounded-lg press-start text-yellow-500 h-min w-full px-5 py-2 pr-10 pl-10 mt-[30px]
                transition-all ease-in-out hover:bg-yellow-200 hover:-translate-y-[2%] active:translate-y-[2%] active:bg-yellow-300" @click="$emit('buildmode')">Build New</button>
                <div class ="h-full w-full justify-between bg-gray-300 mt-1 rounded-xl">
                    <div class="flex flex-col gap-2 items-center">
                    <form class = "absolute bottom-10 flex border border-yellow-500 ">hello</form>
                    <button class="bg-green-300 absolute bottom-10 flex border-green-500 border-2 text-sm rounded-lg press-start text-white h-min w-min px-4 py-2 mt-[30px]
                            transition-all ease-in-out hover:bg-green-400 hover:-translate-y-[2%] active:translate-y-[2%] active:bg-green-300">Done</button>
        
                </div>
                </div>
        
            </div>
            </div>
           
        </div>
    </div>
</template>

<script setup lang="ts">
const currentFilter = ref<string>("")
const filters:filter[] = [
    {displayName: "All", filterProp: "All"},
    {displayName: "Heads", filterProp: "Head"},
    {displayName: "R.Legs", filterProp: "Right Leg"},
    {displayName: "L. Legs", filterProp: "Left Leg"},
    {displayName: "R. Arms", filterProp: "Right Arm"},
    {displayName: "L. Arms", filterProp: "Left Arm"},
    {displayName: "Bodies", filterProp: "Body"},
    {displayName: "Robots", filterProp: "Complete Robots"},
]

const gachaStore = useGachaStore()

const inventoryStore = useInventoryStore()
if(!gachaStore.initialized) {
    await gachaStore.initialize()
}
if(!inventoryStore.initialized) {
    await inventoryStore.initialize()
}

let itemBoxProps = ref<itemBoxProp[]>([])

inventoryStore.inventory.forEach((item:inventoryPart) => {
    if(item.part_id) {
        let info = gachaStore.rewardData?.find((gachaItem:robotPart) => gachaItem.part_id === item.part_id)

        itemBoxProps.value.push({
            inventoryPart: item,
            itemInfo: info
        } as itemBoxProp)
    }
})

let filteredItemBoxProps:ComputedRef<itemBoxProp[]> = computed(() => {
    console.log(currentFilter.value)
    if(currentFilter.value == "All") {
        return itemBoxProps.value
    } else if (currentFilter.value == "Complete Robots") {
        return itemBoxProps.value // placeholder bc we dont have robots
    } else {
        console.log(itemBoxProps.value.filter((item:itemBoxProp) => item.itemInfo.body_part === currentFilter.value))
        return itemBoxProps.value.filter((item:itemBoxProp) => item.itemInfo.body_part == currentFilter.value)
    }
})

currentFilter.value = "All"

</script>

<style scoped>

</style>