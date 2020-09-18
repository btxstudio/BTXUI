<template>
    <span :style="{display: 'inline-block', ...computed_style}">
        <slot/>
    </span>
</template>

<script>
    import bStyle from "./styles/b-style";

    export default {
        extends: bStyle,
        name: "b-text",
        /*
        * init-data{
        *   [* styles: (参照：b-style 组件入参)],
        * }
        * */
    }
</script>