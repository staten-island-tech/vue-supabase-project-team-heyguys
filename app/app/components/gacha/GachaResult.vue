<template>
    <div class="border-2 border-amber-400 mx-[2%] h-full aspect-square rounded-3xl p-[1%] flex flex-col justify-around items-center drop-shadow-md"
    :class="result.class">
        <div>
            <h3 class="press-start text-lg text-black text-center">
                {{ result.item?.name }}
            </h3> <!-- name of completed robot -->
            <h3 class="press-start text-md text-amber-500 text-center italic">
                {{ result.item?.body_part }}
            </h3> <!-- body part -->
        </div>
        <div class="w-[50%] lg:w-[50%] aspect-square bg-black text-black rounded-box">
            <img :src="result.item?.sprite_url" :alt="result.item?.name" class="w-full h-full object-contain">
        </div>
         <h3 class="press-start text-md text-black font-extrabold text-center">
            Rarity: {{result.rarityName}}
        </h3> <!-- rarity -->
    </div>
</template>

<script setup lang="ts">
import type { ResultType } from '#imports'

const props = defineProps<{
    result: ResultType
}>()

</script>

<style scoped>

</style>