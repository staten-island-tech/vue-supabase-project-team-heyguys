<template>
  <div class="bg-gradient-to-tr from-pink-500 to-orange-400 fixed h-[86vh] w-full -translate-y-[2%] flex flex-col items-center justify-center">
        <div class="flex flex-row justify-between items-center z-10 w-[80%] h-[10%] rounded-[5rem] m-[1%]">
            <h2 class="text-4xl text-purple-700 press-start"> WHALEN PARADISE </h2>
            <HomeButton></HomeButton> <!-- ROUTER LINK THAT WILL SEND YOU BACK HOME-->
        </div>

        <div class="flex flex-col items-center bg-slate-300/60 z-10 w-[80%] h-[75%] rounded-3xl border-white border-2 p-[1%] 
        overflow-y-scroll gap-4">
            <h3 class="press-start italic text-center text-purple-700"> some stuff i forgot but is in the rubric so i have to show you; 
                tests are coming up and i cant make this look pretty anymore </h3>
            <paradise-show-aggregations></paradise-show-aggregations>
            <paradise-show-joins></paradise-show-joins>
            <paradise-show-gsap></paradise-show-gsap>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>