<template>
    <b-view :class="combClass" v-bind="viewData">
        <slot />
    </b-view>
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import bView from "../b-view.vue"
    import { ViewData } from "../styles/@types"

    const props = defineProps<{
        
        // 栅格比
        span?: number,

        // 栅格偏移比
        offset?: number,

        // 样式集
        class?: string,

        // b-view 属性
        viewData?: ViewData,
    }>();

    const combClass = ref(`${props.class} ${props.span ? 'col-' + props.span : ''} ${props.offset ? 'offset-' + props.offset : ''}`);
</script>