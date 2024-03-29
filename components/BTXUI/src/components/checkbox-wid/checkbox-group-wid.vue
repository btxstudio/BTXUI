<template>
    <b-view :class="class">
        <checkbox-wid />
    </b-view>
</template>

<script setup lang="ts">
    import { computed } from "vue"
    import checkboxWid from "./checkbox-wid"
    import BView from "../core/b-view"

    const props = defineProps<{
        // 选中状态
        selected: boolean,

        // 样式集
        class?: string,

        // 选中颜色
        actColor?: {
            text?: string,
            bg?: string,
            icon?: string,
        },

        // 标签文字
        label?: string | [string, string],
    }>();
</script>