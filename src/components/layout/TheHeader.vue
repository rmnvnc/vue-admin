<template>
    <template v-if="auth.isAuthenticated">Logged in as {{auth.user.login}} <button @click="auth.logout()">Odhlásiť</button></template>
    <template v-else>Not logged in</template>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
</script>

<style scoped>
header {
    border-bottom: 2px solid white;
    padding: 2rem;
}

button {
    margin-left: 1rem;
}
</style>
