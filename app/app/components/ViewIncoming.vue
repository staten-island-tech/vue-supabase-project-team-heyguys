<template>
    <div class="h-[86%] border-2 w-[90%] rounded-2xl bg-white">
        <div class="h-[85%] w-full flex flex-col justify-between items-center py-[1%]">
            <TradeRequest v-for="num in [1, 2, 3]"></TradeRequest>
        </div>
        <TradePagination></TradePagination>
    </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
const isLargeScreen:Ref<boolean> = useMediaQuery('(min-width: 1024px)')
</script>

<style scoped>

</style>