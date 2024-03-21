<template>
    <b-style :class="class" :cname="cname" :states="states" :matrix="matrix">
        <template v-slot:className="scope">
            <div :class="scope.className"
                :state="state"
                :style="{...bgStyle, ...scope.matrixStyle}">
                <slot/>
            </div>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import { computed } from "vue"
    import bStyle from "./styles/b-style.vue"
    import { State } from "./styles/@types"

    const props = defineProps<{
        // 样式集
        class?: any,

        // 当前状态
        state?: State,

        // 状态样式集
        states?: { [key: string]: any },
        
        // 背景图
        bgImg?: string,

        // 变形矩阵
        matrix?: {
            translate?: string,
            scale?: string,
            rotate?: string,
            skew?: string
        },

        // 样式集别名
        cname?: string,
    }>()

    // 背景图样式
    const bgStyle = computed(() => props.bgImg? {backgroundImage: `url(${ props.bgImg })`}: {});
</script>