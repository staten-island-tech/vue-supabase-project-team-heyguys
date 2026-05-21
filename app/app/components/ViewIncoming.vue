<template>
    <div class="h-[86%] border-2 w-[90%] rounded-2xl bg-white">
        <div class="h-[85%] w-full flex flex-col justify-between items-center py-[1%]">
            <TradeRequest v-for="num in usedData"
            :num="num"
            ></TradeRequest>
        </div>
        <TradePagination :pageNum="pageNum" :pageCount="Math.ceil(sampleData.length / 3)"
        @back="pageNum=Math.max(pageNum-1, 1)"
        @forward="pageNum=Math.min(pageNum+1, Math.ceil(sampleData.length / 3))"
        ></TradePagination>
    </div>
</template>

<script setup lang="ts">
let sampleData:Ref<number[]> = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])

defineProps({
    requests: {
        type: Array,
        required: true
    }
})

const pageNum:Ref<number> = ref(1)

const usedData = computed(() => {
    return sampleData.value.filter(
        (el, index) => Math.floor(index / 3) === pageNum.value - 1
    )
})
</script>

<style scoped>

</style>