<template>
    <img v-else-if="img" :src="img" :style="computed_style">
</template>

<script>
    import bStyle from "@/components/core/styles/b-style";

    export default {
        extends: bStyle,
        name: "b-img",
        /*
        * init-data{
        *   img: "图片数据",
        *   [* styles: [
        *       样式规范，基于并扩展 btx·UI 全局样式语法,...
        *   ]],
        * }
        * */
        props: {
            img: {
                type: String,
                required: false
            },
            styles: {
                type: [Array, String],
                required: false
            },
        },
    }
</script>