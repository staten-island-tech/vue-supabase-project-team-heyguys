<template>
    <div class="group relative bg-white h-[125px] w-[125px] border border-yellow-500 press-start text-sky-300 px-2 flex items-center flex-row justify-center rounded-lg text-[0.63rem] text-left
            transition-all ease-in-out duration-300 hover:bg-gray-100/95 hover:text-yellow-500 hover:-translate-y-1 hover:border-yellow-500 hover:border" 
            >
        <img v-if="!isCompletedRobot" :src="item.itemInfo.sprite_url" alt="insert sprite" class="flex scale-[3.0] aspect-square w-12 h-12 object-contain">
        <div class="flex mt-2 ml-2">
            <h3 class="text-[0.63rem] text-gray-800 absolute bottom-1 left-1">{{ item.inventoryPart.quantity }}x</h3>
        </div>
        <div class="hidden group-hover:block">
        <inventory-info-box v-if="isPart" class="flex flex-col justify-start">
            <p class="text-yellow-400 text-center my-[7%]" :class="nameClass">{{ item.itemInfo.name }}</p>
            <p class="text-[.7rem]">{{ item.itemInfo.body_part }}</p>
        </inventory-info-box>
        </div>
        <div class="absolute bottom-1 right-1" v-if="buildMode && isPart && !selected && item.inventoryPart.completed_robot_id === null">
            <inventory-mini-button type="add" @click="emit('addPart', item)"></inventory-mini-button> 
        </div>
        <div class="absolute bottom-1 right-1" v-if="buildMode && isPart && selected && item.inventoryPart.completed_robot_id === null">
            <inventory-mini-button type="remove" @click="emit('removePart', item)"></inventory-mini-button> 
        </div>
        <div class="absolute bottom-1 flex-col right-1" v-if="!buildMode && isCompletedRobot">
            <inventory-mini-button type="delete"></inventory-mini-button> 
            <inventory-mini-button type="edit"></inventory-mini-button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: itemBoxProp
  buildMode: boolean
  selected: boolean
}>()

const isPart = computed(() => {
  return props.item.inventoryPart.part_id !== null
})

const isCompletedRobot = computed(() => {
  return props.item.inventoryPart.part_id === null
})

let nameClass = computed(() => {
    if(props.item.itemInfo.name.length > 12) {
        return "text-[1rem]"
    } return "text-[1.125rem]"
})

function handleBuildMode(){
    console.log('build mode')
}

const emit = defineEmits<{addPart: [item: itemBoxProp]
removePart: [item: itemBoxProp]
}>()



</script>

<style scoped>

</style>