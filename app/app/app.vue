<template>
  <div class="h-screen w-full z-10">
    <NuxtLayout class="h-screen"> 
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const loginStore = useLoginStore()
await loginStore.loadUser()
</script>