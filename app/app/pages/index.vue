<template>
    <LoggedinHome v-if="loggedIn" @logout="loggedIn=false"></LoggedinHome>
    <LoggedoutHome v-else @login="loggedIn=true"></LoggedoutHome>
</template>

<script setup lang="ts">
const loggedIn:Ref<boolean> = ref(true)
</script>

<style scoped></style>