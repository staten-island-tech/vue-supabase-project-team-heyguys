<template>
  <div class="relative h-[80px] w-[60px]">

    <img
      v-if="parts.Body" :src="parts.Body.itemInfo.sprite_url"
      alt="Body"
      class="absolute left-1/2 top-[10px] h-[42px] w-[40px] -translate-x-1/2 object-contain"
    >

    <img
      v-if="parts.Head" :src="parts.Head.itemInfo.sprite_url"
      alt="Head"
      class="absolute left-1/2 top-0 h-[20px] w-[20px] -translate-x-1/2 object-contain"
    >

    <img
      v-if="parts['Left Arm']" :src="parts['Left Arm'].itemInfo.sprite_url"
      alt="Left arm"
      class="absolute left-[10px] top-[10px] h-[38px] w-[18px] object-contain"
    >

    <img
      v-if="parts['Right Arm']" :src="parts['Right Arm'].itemInfo.sprite_url"
      alt="Right arm"
      class="absolute right-[10px] top-[10px] h-[38px] w-[18px] object-contain"
    >

    <img
      v-if="parts['Left Leg']" :src="parts['Left Leg'].itemInfo.sprite_url"
      alt="Left leg"
      class="absolute bottom-0 left-[24px] h-[50px] w-[20px] object-contain"
    >

    <img
      v-if="parts['Right Leg']" :src="parts['Right Leg'].itemInfo.sprite_url"
      alt="Right leg"
      class="absolute bottom-0 right-[24px] h-[50px] w-[20px] object-contain"
    >
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

defineProps<{
  parts: Record<RobotSlot, itemBoxProp | null>
}>()
</script>