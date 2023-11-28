<template>
    <b-style :class="class">
        <div :class="class"
            :style="{backgroundImage: `url(${ bgImg })`}">
            <slot/>
        </div>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"

    defineProps<{
        // 样式集
        class?: string,
        
        // 背景图
        bgImg?: string,
    }>()
</script>