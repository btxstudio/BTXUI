<template>
    <span :style="computed_style">
        <slot/>
    </span>
</template>

<script>
    import bStyle from "@/components/core/styles/b-style";

    export default {
        extends: bStyle,
        name: "b-text",
        /*
        * init-data{
        *   [* styles: [
        *       样式规范，基于并扩展 btx·UI 全局样式语法,...
        *   ]],
        * }
        * */
    }
</script>