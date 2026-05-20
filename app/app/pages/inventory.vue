<template>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h2 class="text-4xl text-yellow-500 press-start"> YOUR INVENTORY </h2>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div class="flex flex-col justify-between items-center bg-slate-300/60 z-10 w-[80%] h-[75%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <div class = "inventory h-[86vh] w-[40vw] rounded-2xl flex justify-start flex-col items-center bg-gray-200 mr-auto mb-2">
                <div class ="menu flex-1 flex-col justify-between items-center space-x-0">
                <FilterMenu :filters="['All', 'Heads', 'R.leg', 'L.Leg', 'R.Arm', 'L.Arm', 'Complete Robots']" />
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>