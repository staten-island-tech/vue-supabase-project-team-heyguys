<template>
    <div class="flex flex-col h-[50%] justify-between items-center">
        <label
            class="input pl-0 flex flex-row items-center bg-white border-yellow-500 border-4 h-[40%] w-[60%] rounded-3xl">
            <svg width="20%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="circle-clip">
                        <circle cx="340" cy="200" r="160" />
                    </clipPath>
                </defs>
                <circle cx="340" cy="200" r="160" fill="#fee685" stroke="#efb100" stroke-width="1.5" />
                <circle cx="340" cy="170" r="62" fill="#efb100" />
                <ellipse cx="340" cy="340" rx="112" ry="76" fill="#efb100" clip-path="url(#circle-clip)" />
            </svg>
            <input type="text" class="grow press-start text-black text-2xl" placeholder="Username..." />
            <!-- CHANGE THIS HERE HERE HERE-->
        </label>

        <label
            class="input pl-0 flex flex-row items-center bg-white border-yellow-500 border-4 h-[40%] w-[60%] rounded-3xl transition-all ease-in-out duration-300">
            <svg width="20%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="key-circle-clip">
                        <circle cx="340" cy="200" r="160" />
                    </clipPath>
                </defs>
                <circle cx="340" cy="200" r="160" fill="#fee685" stroke="#efb100" stroke-width="1.5" />
                <g transform="translate(340,200) rotate(-45)">
                    <circle cx="-60" cy="0" r="46" fill="none" stroke="#efb100" stroke-width="20" />
                    <circle cx="-60" cy="0" r="16" fill="#fee685" />
                    <rect x="-16" y="-10" width="130" height="20" rx="5" fill="#efb100" />
                    <rect x="30" y="10" width="16" height="22" rx="3" fill="#efb100" />
                    <rect x="64" y="10" width="16" height="16" rx="3" fill="#efb100" />
                    <rect x="96" y="10" width="16" height="26" rx="3" fill="#efb100" />
                </g>
            </svg>
            <input type="search" class="grow press-start text-black text-2xl" placeholder="Password..." />
            <!-- CHANGE THIS HERE HERE HERE-->
        </label>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>