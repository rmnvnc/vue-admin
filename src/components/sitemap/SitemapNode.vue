<template>
    <li class="node"  :class="{ opened: isOpen}">
        <div @click="toggle">
            <span v-if="hasChildren">{{ isOpen ? '▾' : '▸' }}</span>
            <span v-else style="width: 1em;"></span>
            {{ node.name }}
        </div>
        <ul v-if="isOpen" class="pl-4" >
            <SitemapNode
                v-for="child in node.items"
                :key="child.ID"
                :node="child"
            />
        </ul>
    </li>
</template>

<script setup lang="ts">
import type { SitemapNode } from '@/types'
import { ref, computed } from 'vue'

const props = defineProps<{ node: SitemapNode }>()

const isOpen = ref(false)
const hasChildren = computed(() => props.node.items && props.node.items.length > 0)

function toggle() {
    if (hasChildren.value) {
        isOpen.value = !isOpen.value
    }
}
</script>

<style scoped>
.node {
    border: 1px solid white;
    padding: .5rem;
    margin-bottom: .5rem;
}
.opened {
    background-color: rgba(0, 128, 0, 0.486);
}
</style>
