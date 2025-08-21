<template>
    <header>
        <the-header/>
    </header>
    <div class="layout">
        <nav class="side">
            <slot name="side"/>
        </nav>
        <main class="content">
            <slot name="content"/>
        </main>
    </div>
</template>

<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
</script>

<style scoped>
.layout {
    display: grid;
    padding: 1rem;
    grid-template-columns: 25% 75%;
    min-height: 0;
}
.side {
    overflow: auto;
    min-height:0;
    border: 1px solid white;
    padding: .5rem;
}
.content {
    padding-left: 1rem;
    min-height:0;
}
header {
    padding: 1rem;
}
</style>