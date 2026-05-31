<template>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-end items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>
        <div class="flex flex-col items-center bg-slate-300/60 z-10 w-[80%] h-[80%] rounded-3xl border-yellow-500 border-2 p-[1%]">
            <h2 class="text-4xl justify-start text-yellow-500 press-start text-left"> TENTATIVE MADNESS </h2>
            <h3 class="text-2xl text-center justify-start text-yellow-200 press-start mt-12 mb-12"> To play, press [SPACE] when the bars match up!</h3>
           <div class="grid rounded-full bg-white w-full h-[100px] ">
                <div class=" col-start-6 row-start-1 rounded-full bg-green-200 w-[300px] h-[100px] ">
                </div>
                <div class=" col-start-1 row-start-1 rounded-2xl bg-gray-200 w-[10px] h-[100px] ">
                </div>
           </div>
        </div>
        
        </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>