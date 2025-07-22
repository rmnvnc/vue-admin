<template>
    <div>
        <template v-if="auth.isAuthenticated">Logged in as {{auth.user.login}} <button @click="auth.logout()">Odhlásiť</button></template>
        <template v-else>Not logged in</template>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<style scoped>
</style>
