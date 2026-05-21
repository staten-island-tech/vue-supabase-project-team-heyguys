<template>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h2 class="text-4xl text-yellow-500 press-start"> YOUR INVENTORY </h2>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div class="flex flex-col justify-between items-center bg-slate-300/60 z-10 w-[80%] h-[80%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <div class = "flex flex-row justify-between w-full h-full">
            <div class = "inventory h-[65vh] w-[40vw] rounded-2xl flex justify-start flex-col items-center bg-gray-100 mr-auto mb-2">
                <div class ="menu flex flex-1 flex-col justify-between items-center space-x-0">
                <FilterMenu :filters="['All', 'Heads', 'R.leg', 'L.Leg', 'R.Arm', 'L.Arm', 'Complete Robots']" />
                </div>
                <div class="h-full w-full flex flex-wrap flex-row gap-6 items-center justify-center p-2 overflow-y-scroll scrollbar-gutter: stable">
                    <InventoryBox v-for="i in 50" :key="i" /> <!--REPLACE THIS WITH USER INVENTORY LENGTH LATER-->
                </div>
            </div>
            <div class= "flex flex-col justify-end items-start mr-[200px] ml-auto mb-[-10]">
                <button class="bg-white flex border-yellow-500 border-2 text-2xl rounded-lg press-start text-yellow-500 h-[10%] w-full px-5 py-2 pr-10 pl-10 mt-[30px]
                transition-all ease-in-out hover:bg-yellow-200 hover:-translate-y-[2%] active:translate-y-[2%] active:bg-yellow-300" @click="$emit('buildmode')">Build New</button>
                <div class ="h-full w-full items-center bg-gray-300 mt-1 rounded-xl">
                </div>
                <div class="flex flex-row gap-2 items-center bg-gray-300 mt-1 rounded-xl">
                </div>
            </div>
            </div>
           
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>