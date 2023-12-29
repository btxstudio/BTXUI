<template>
    <b-style :class="class">
        <template v-slot:className="scope">
            <iframe :class="scope.className" frameborder="0" :src="src"></iframe>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"

    defineProps<{
        // 网页地址
        src: string,

        // 样式集
        class?: string
    }>()
</script>