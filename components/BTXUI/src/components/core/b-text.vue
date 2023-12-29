<template>
    <b-style :class="class" :states="states">
        <template v-slot:className="scope">
            <span :class="scope.className" :state="state">
                <slot/>
            </span>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"

    defineProps<{
        // 样式集
        class?: string,

        // 当前状态
        state?: string | boolean,

        // 状态样式集
        states?: { [key: string]: any }
    }>()
</script>