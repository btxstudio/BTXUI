<template>
    <b-view :class="combClass" v-bind="viewData" :extraClass="{
        selector: '>',
        value: `pad-h-${gap[0]} pad-v-${gap[1]}`
    }">
        <slot />
    </b-view>
</template>

<script setup lang="ts">
    import { ref, computed } from "vue"
    import bView from "../b-view.vue"
    import { ViewData } from "../styles/@types"

    const props = defineProps<{

        // 样式集
        class?: string,

        // 元素间距
        gap?: number | [number, number],

        // b-view 属性
        viewData?: ViewData,
    }>();

    // 间隔
    const gap = computed<[string, string]>(() => {
        if (!props.gap) return ['0', '0'];
        const gap = props.gap;
        return ((Array.isArray(gap) && gap.length === 2) ? gap : [gap, gap] as [number, number]).map(val => (val / 2).toString().replace('.', 'd')) as [string, string];
    });

    const combClass = ref(`${props.class} flex pad-h-${gap.value[0]} pad-v-${gap.value[1]}`);
</script>