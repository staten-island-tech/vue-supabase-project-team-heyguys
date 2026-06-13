<template>
    <div class="group relative bg-white h-[125px] w-[125px] border border-yellow-500 press-start text-sky-300 px-2 flex items-center flex-row justify-center rounded-lg text-[0.63rem] text-left
            transition-all ease-in-out duration-300 hover:bg-gray-100/95 hover:text-yellow-500 hover:-translate-y-1 hover:border-yellow-500 hover:border" 
            >
        <img src="/spriteplaceholder.PNG" alt="insert sprite" class="flex aspect-square w-12 h-12 object-contain">
        <div class="flex mt-2 ml-2">
            <h3 class="text-[0.63rem] text-gray-800 absolute bottom-1 left-1">1x</h3>
        </div>
        <div class= "hidden group-hover:block">
        <InfoBox>
            <p>name</p>
            <p>type</p>
            <p>desc</p>
        </InfoBox>
        </div>
        <div class="absolute bottom-1 right-1">
                <MiniButton type="add"></MiniButton>
        </div>
    </div>
</template>

<script setup lang="ts">

function handleBuildMode(){
    console.log('build mode')
}

</script>

<style scoped>

</style>