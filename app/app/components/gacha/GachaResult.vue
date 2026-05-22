<template>
    <div class="bg-white border-2 border-amber-400 mx-[2%] h-full aspect-square rounded-3xl p-[1%] flex flex-col justify-around items-center drop-shadow-md">
        <div>
            <h3 class="press-start text-lg text-black text-center">
                Optimus Prime
            </h3> <!-- name of completed robot -->
            <h3 class="press-start text-md text-amber-500 text-center italic">
                Left Arm
            </h3> <!-- body part -->
        </div>
        <div class="w-[60%] lg:w-[50%] aspect-square bg-black text-black rounded-box">
            hi
        </div>
         <h3 class="press-start text-lg text-black font-extrabold text-center">
            Rarity: {{result}}
        </h3> <!-- rarity -->
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