<template>
    <div class="bg-gradient-to-tl from-sky-400 to-sky-200 border-2 border-blue-400 mx-[2%] h-full min-w-[25vw] rounded-3xl p-[1%] flex flex-col justify-around items-center">
        <div>
            <h3 class="press-start text-lg text-sky-950 text-center">
                Optimus Prime
            </h3>
            <h3 class="press-start text-md text-sky-600 text-center italic">
                Left Arm
            </h3>
        </div>
        <div class="w-[60%] aspect-square bg-black text-black rounded-box">
            hi
        </div>
         <h3 class="press-start text-xl text-sky-950 font-extrabold text-center">
            Rarity: {{result}}
        </h3>
    </div>
</template>

<script setup lang="ts">
defineProps({
    result: {
        type: null, // change to object eventually 
        required: true
    }
})
</script>

<style scoped>

</style>