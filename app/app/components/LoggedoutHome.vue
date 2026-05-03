<template>
    <div
        class="bg-gradient-to-b from-cyan-950 to-sky-800 fixed h-full w-full -translate-y-[2%] flex flex-col items-center">
        <div class="flex flex-col justify-around items-center bg-slate-300/60 z-10 w-[80%] h-[70%] mt-[5%] rounded-[5rem] border-yellow-500 border-2">
            <LoginMenu></LoginMenu>
            <div class="h-[30%] w-[90%] flex flex-row justify-between items-center">
                <button class="bg-white border-yellow-500 border-4 text-xl lg:text-3xl rounded-3xl press-start text-yellow-500 h-[80%] w-[42%]
                transition-all ease-in-out hover:bg-yellow-200 hover:-translate-y-[2%] active:translate-y-[2%] active:bg-yellow-300"
            @click="$emit('login')">     Log In </button>

                <div class="w-[10%] bg-white/70 h-[60%] flex items-center justify-center rounded-3xl">
                    <h4 class="text-center text-yellow-500 press-start text-lg lg:text-2xl"> OR </h4>
                </div>

                <button class="bg-white border-yellow-500 border-4 text-xl lg:text-3xl rounded-3xl press-start text-yellow-500 h-[80%] w-[42%]
                transition-all ease-in-out hover:bg-yellow-200 hover:-translate-y-[2%] active:translate-y-[2%] active:bg-yellow-300"
                @click="$emit('login')">     Register </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["login"])
</script>

<style scoped></style>