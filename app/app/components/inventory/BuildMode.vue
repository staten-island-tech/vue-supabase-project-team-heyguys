<template>
  <div class="flex h-full w-full flex-col items-center justify-center mb-0">

    <div class="flex h-24 w-24 items-center justify-center border border-gray-300 bg-white">
      <img
        v-if="selectedParts.Head" :src="selectedParts.Head.itemInfo.sprite_url"
        alt="Head"
        class="h-full w-full object-contain"
      >
    </div>

    <div class="flex flex-row">
      <div class="flex h-24 w-12 items-center justify-center border border-gray-300 bg-white">
        <img
        v-if="selectedParts['Left Arm']" :src="selectedParts['Left Arm'].itemInfo.sprite_url"
          alt="Left arm"
          class="h-full w-full object-contain"
        >
      </div>

      <div class="flex h-24 w-20 items-center justify-center border border-gray-300 bg-white">
        <img
        v-if="selectedParts.Body" :src="selectedParts.Body.itemInfo.sprite_url"
          alt="Body"
          class="h-full w-full object-contain"
        >
      </div>

      <div class="flex h-24 w-12 items-center justify-center border border-gray-300 bg-white">
        <img
          v-if="selectedParts['Right Arm']" :src="selectedParts['Right Arm'].itemInfo.sprite_url"
          alt="Right arm"
          class="h-full w-full object-contain"
        >
      </div>
    </div>

    <div class="flex flex-row">
      <div class="flex h-24 w-12 items-center justify-center border border-gray-300 bg-white">
        <img          
        v-if="selectedParts['Left Leg']" :src="selectedParts['Left Leg'].itemInfo.sprite_url"
          alt="Left leg"
          class="h-full w-full object-contain"
        >
      </div>

      <div class="flex h-24 w-12 items-center justify-center border border-gray-300 bg-white">
        <img
          v-if="selectedParts['Right Leg']" :src="selectedParts['Right Leg'].itemInfo.sprite_url"
          alt="Right leg"
          class="h-full w-full object-contain"
        >
      </div>
    </div>
    
    <RobotStatChart :stats="stats" :max-value="100" />
  </div>
  
</template>

<script setup lang="ts">
type RobotSlot =
  | 'Head'
  | 'Body'
  | 'Left Arm'
  | 'Right Arm'
  | 'Left Leg'
  | 'Right Leg'

const props = defineProps<{
  selectedParts: Record<RobotSlot, itemBoxProp | null> //same logic as before in inventory.vue
}>()

function getStat(item: itemBoxProp | null): number {
  if (!item) return 0
  return 'stat' in item.itemInfo ? item.itemInfo.stat : 0
}

const stats = computed<statSpread>(() => ({
  hp: getStat(props.selectedParts.Head),
  attack: getStat(props.selectedParts['Left Arm']) + getStat(props.selectedParts['Right Arm']),
  defense: getStat(props.selectedParts.Body),
  speed: getStat(props.selectedParts['Left Leg']) + getStat(props.selectedParts['Right Leg']),
}))


</script>