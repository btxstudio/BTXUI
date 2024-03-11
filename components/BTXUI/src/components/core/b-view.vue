<template>
    <b-style :class="class" :cname="cname" :states="states">
        <template v-slot:className="scope">
            <div :class="scope.className"
                :state="state"
                :style="lineStyle">
                <slot/>
            </div>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import { computed } from "vue"
    import bStyle from "./styles/b-style.vue"

    const props = defineProps<{
        // 样式集
        class?: string,

        // 当前状态
        state?: string | boolean,

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

    // 行内样式
    const lineStyle = computed(() => {
        const bgImg = props.bgImg? {backgroundImage: `url(${ props.bgImg })`}: {}; // 背景图
        const translate = props.matrix?.translate? `translate(${ props.matrix?.translate })`: ""; // 位移
        const scale = props.matrix?.scale? `scale(${ props.matrix?.scale })`: ""; // 放缩
        const rotate = props.matrix?.rotate? `rotate(${ props.matrix?.rotate })`: ""; // 旋转
        const skew = props.matrix?.skew? `skew(${ props.matrix?.skew })`: ""; // 斜切
        const transform = props.matrix? {
            transform: `${ translate } ${ scale } ${ rotate } ${ skew }`
        }: {}; 

        return {
            ...bgImg,
            ...transform
        }
    })
</script>