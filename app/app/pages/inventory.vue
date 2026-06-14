<template>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h2 class="text-4xl text-yellow-500 press-start"> YOUR INVENTORY </h2>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div class="flex flex-col justify-between items-center bg-slate-300/60 z-10 w-[80%] h-[80%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <div class = "flex flex-row justify-between w-full h-full">
            <div class = "inventory h-[65vh] w-[45vw] rounded-2xl flex justify-start flex-col items-center bg-gray-100 mx-[1%] mb-2">
                <div class ="menu flex flex-1 flex-col justify-between items-center space-x-0">
                <inventory-filter-menu :filters="filters" 
                @use-filter="(newFilter) => currentFilter = newFilter"
                />
                </div>
                <div class="w-[95%] h-[2%] rounded-full bg-yellow-400"></div>
                <div class="h-full w-full flex flex-wrap flex-row gap-5 items-center justify-center p-2 overflow-y-scroll scrollbar-gutter stable pt-6"> 
                    <InventoryItemBox v-for="item in filteredItemBoxProps" 
                    :item="item" :buildMode="buildMode" @add-part="addPartToRobot" @remove-part="removePartFromRobot" :selected="isSelected(item)" v-if="filteredItemBoxProps.length > 0"/>
                    <div class="border-yellow-500 border-2 rounded-2xl w-full h-full flex justify-center items-center"
                    v-else>
                        <h2 class="press-start text-black text-center text-2xl">NO ITEMS FOUND</h2>
                    </div>
                </div>
            </div>
            <div class="flex flex-col justify-around mb-[-10] w-300px">
                <button class="bg-white flex border-yellow-500 border-2 text-2xl rounded-lg press-start text-yellow-500 h-min w-full px-5 py-2 pr-10 pl-10 mt-[30px]
                transition-all ease-in-out hover:bg-yellow-200 hover:-translate-y-[2%] active:translate-y-[2%] active:bg-yellow-300" @click="buildMode = !buildMode"> {{ buildMode ? 'End Build' : 'Build New' }}</button>
                <div class ="h-full w-full justify-between bg-gray-300 mt-1 rounded-xl">
                    <div class="flex items-center justify-center w-full h-full">
                    <InventoryBuildMode v-if="buildMode" :selected-parts="selectedParts"></InventoryBuildMode>
                    </div>
                       <form v-if="buildMode" @submit.prevent="confirmRobotBuild" class="flex flex-row absolute bottom-8 gap-[2px] items-center w-max">
                    <label for="RobotNames" class="border-2 border-gray-200 rounded-md">Robot Name</label>
                    <input type="text" id="RobotNames" v-model.trim="robotName" class="flex w-[190px] h-min bg-white border-2 px-4 py-2 border-yellow-500 rounded-lg  text-black text-sm press-start placeholder:text-black outline-none focus:ring-2 focus:ring-yellow-300" placeholder="Name">
                    <button type="submit" :disabled="savingRobot || !completedList || !robotName.trim()" class= "bg-green-300 flex border-green-500 border-2 text-sm rounded-lg press-start text-white h-min w-min px-4 py-2
                transition-all ease-in-out hover:bg-green-400 hover:-translate-y-[2%] active:translate-y-[2%] active:bg-green-300">{{ savingRobot ? 'Saving...' : 'Done' }}</button>
                       </form>
                </div>
        
            </div>
            </div>
           
        </div>
    </div>
</template>

<script setup lang="ts">
const currentFilter = ref<string>("")
const buildMode = ref<boolean>(false)
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

let itemBoxProps = computed<itemBoxProp[]>(() => {
return inventoryStore.inventory.map((item: inventoryPart) => {
    if (item.part_id !== null) {
      const info = gachaStore.rewardData?.find(
        (gachaItem: robotPart) =>
          gachaItem.part_id === item.part_id,
      )

      return {
        inventoryPart: item,
        itemInfo: info,
      } as itemBoxProp
    }

    return {
      inventoryPart: item,
      itemInfo: {
        part_id: null,
        name: item.robot_name ?? 'Completed Robot',
        body_part: 'Complete Robots',
        sprite_url: '',
      },
    } as itemBoxProp
  })
})

const activeRobotId = ref<string | null>(null)

const visibleItemBoxProps = computed(() => {
  return itemBoxProps.value.filter((item) => {
    const isRobot = item.inventoryPart.part_id === null

    if (isRobot) {
      return !buildMode.value
    }

    const assignedRobotId =
      item.inventoryPart.completed_robot_id

    if (assignedRobotId === null) {
      return true
    }

    return (
      buildMode.value &&
      activeRobotId.value === assignedRobotId
    )
  })
})

let filteredItemBoxProps:ComputedRef<itemBoxProp[]> = computed(() => {
    const visibleItems = visibleItemBoxProps.value
    if(currentFilter.value == "All") {
        return visibleItems
    } else if (currentFilter.value == "Complete Robots") {
        return visibleItems.filter(
      item => item.inventoryPart.part_id === null)
    } else {
        return visibleItems.filter((item) => item.itemInfo.body_part == currentFilter.value)
    }
})

currentFilter.value = "All"

const robotName = ref('')
const savingRobot = ref(false)
const buildError = ref('')


type RobotSlot =
  | 'Head'
  | 'Body'
  | 'Left Arm'
  | 'Right Arm'
  | 'Left Leg'
  | 'Right Leg'

const selectedParts = reactive<Record<RobotSlot, itemBoxProp | null>>({
  Head: null,
  Body: null,
  'Left Arm': null,
  'Right Arm': null,
  'Left Leg': null,
  'Right Leg': null,
})

function addPartToRobot(item: itemBoxProp) {
  const slot = item.itemInfo.body_part as RobotSlot //slot to only store one value

  if (!(slot in selectedParts)) {
    console.error('Invalid robot part:', slot)
    return
  }

  if (item.inventoryPart.completed_robot_id !== null) {
    console.error('This part already belongs to another robot')
    return
  }

  selectedParts[slot] = item //replace any repeats with whatever the user chooses next of the same type
}

function removePartFromRobot(item: itemBoxProp) {
  const slot = item.itemInfo.body_part as RobotSlot

  if (selectedParts[slot]?.inventoryPart.uuid === item.inventoryPart.uuid) {
    selectedParts[slot] = null
  }
}

function isSelected(item: itemBoxProp) {
  const slot = item.itemInfo.body_part as RobotSlot

  return (
    selectedParts[slot]?.inventoryPart.uuid ===
    item.inventoryPart.uuid
  )
}

const selectedPartArray = computed<itemBoxProp[]>(() => {
  return Object.values(selectedParts).filter(
    (part): part is itemBoxProp => part !== null,
  )
})

const completedList = computed(() => {
  return selectedPartArray.value.length === 6
})

async function confirmRobotBuild() {
  buildError.value = ''

  if (!robotName.value.trim()) {
    buildError.value = 'Please enter a robot name.'
    return
  }

  if (!completedList.value) {
    buildError.value = 'Select one part for every slot.'
    return
  }
  savingRobot.value = true

  try {
    await inventoryStore.buildRobot(
      robotName.value,
      selectedPartArray.value,
    )
    robotName.value = ''

    for (const slot of Object.keys(selectedParts) as RobotSlot[]) {
      selectedParts[slot] = null
    }
    buildMode.value = false
  } catch (error) {
    buildError.value =
      error instanceof Error
        ? error.message
        : 'Could not build robot.'
  }
    finally {
    savingRobot.value = false
  }
}

</script>

<style scoped>

</style>