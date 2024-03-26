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
    import { ViewData, State } from "./styles/@types"

    interface ViewDataProps extends ViewData {
        class?: any,
        state?: State,
        states?: { [key: string]: any },
        bgImg?: string,
        matrix?: {
            translate?: string,
            scale?: string,
            rotate?: string,
            skew?: string
        },
        cname?: string
    }
    const props = defineProps<ViewDataProps>()

    // 背景图样式
    const bgStyle = computed(() => props.bgImg? {backgroundImage: `url(${ props.bgImg })`}: {});
</script>