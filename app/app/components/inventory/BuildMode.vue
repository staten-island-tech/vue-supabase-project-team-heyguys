<template>
  <div class="flex h-full w-full flex-col items-center justify-center">

    <div class="flex h-12 w-12 items-center justify-center border border-gray-300 bg-white">
      <img
        v-if="selectedParts.Head" :src="selectedParts.Head.itemInfo.sprite_url"
        alt="Head"
        class="h-full w-full object-contain"
      >
    </div>

    <div class="flex flex-row">
      <div class="flex h-12 w-4 items-center justify-center border border-gray-300 bg-white">
        <img
        v-if="selectedParts['Left Arm']" :src="selectedParts['Left Arm'].itemInfo.sprite_url"
          alt="Left arm"
          class="h-full w-full object-contain"
        >
      </div>

      <div class="flex h-12 w-10 items-center justify-center border border-gray-300 bg-white">
        <img
        v-if="selectedParts.Body" :src="selectedParts.Body.itemInfo.sprite_url"
          alt="Body"
          class="h-full w-full object-contain"
        >
      </div>

      <div class="flex h-12 w-4 items-center justify-center border border-gray-300 bg-white">
        <img
          v-if="selectedParts['Right Arm']" :src="selectedParts['Right Arm'].itemInfo.sprite_url"
          alt="Right arm"
          class="h-full w-full object-contain"
        >
      </div>
    </div>


    <div class="flex flex-row">
      <div class="flex h-12 w-4 items-center justify-center border border-gray-300 bg-white">
        <img          
        v-if="selectedParts['Left Leg']" :src="selectedParts['Left Leg'].itemInfo.sprite_url"
          alt="Left leg"
          class="h-full w-full object-contain"
        >
      </div>

      <div class="flex h-12 w-4 items-center justify-center border border-gray-300 bg-white">
        <img
          v-if="selectedParts['Right Leg']" :src="selectedParts['Right Leg'].itemInfo.sprite_url"
          alt="Right leg"
          class="h-full w-full object-contain"
        >
      </div>
    </div>
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


</script>