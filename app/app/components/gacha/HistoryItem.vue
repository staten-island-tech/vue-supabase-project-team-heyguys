<template>
    <div class="w-full border-yellow-500 border-2 mb-[3%] rounded-2xl h-[20%] p-[2%] flex items-center justify-between">
        <div class="border-yellow-500 border-2 w-[50%] h-full flex justify-center items-center text-black rounded-2xl press-start">
            {{rarity.toUpperCase() }}
        </div>
        <h4 class="press-start text-black text-center"> {{ item?.name }}'s {{ item?.body_part }} </h4>
    </div>
</template>

<script setup lang="ts">
import { useGachaStore } from '#imports';

const props = defineProps<{part_id: string; allItems:robotPart[]}>()
const item = props.allItems.find((item) => item.part_id === props.part_id)
const rarity = ref<string>("")

onMounted(() => {
    rarity.value = useGachaStore().getRarity(item)
})

</script>

<style scoped>

</style>