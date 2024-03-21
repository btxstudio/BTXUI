<template>
    <b-style :class="class" :states="states" :cname="cname">
        <template v-slot:className="scope">
            <span :class="scope.className" :state="state">
                <slot/>
            </span>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"
    import { State } from "./styles/@types"

    defineProps<{
        // 样式集
        class?: string,

        // 当前状态
        state?: State,

        // 状态样式集
        states?: { [key: string]: any },

        // 样式集别名
        cname?: string,
    }>()
</script>