<template>
    <b-style :class="class">
        <span :class="class">
            <slot/>
        </span>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"

    defineProps<{
        // 样式集
        class?: string
    }>()
</script>