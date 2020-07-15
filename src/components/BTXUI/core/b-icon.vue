<template>
    <!--字体图标-->
    <i v-if="icon" :class="`ico-${icon}`" :style="computed_style"></i>

    <!--图片图标-->
    <b-img v-else-if="img" :img="img" :styles="styles" />
</template>

<script>
    import bStyle from "./styles/b-style";
    import BImg from "./b-img";

    export default {
        extends: bStyle,
        name: "b-icon",
        components: {
            BImg
        },
        /*
        * init-data{
        *   [* styles: [
        *       样式规范，基于并扩展 btx·UI 全局样式语法,...
        *   ]],
        *   [* icon: "字体图标名（无需 ico 前缀）"],
        *   [* img: "图片图标数据"],
        * }
        * */
        props: {
            icon: {
                type: String,
                required: false
            },
            img: {
                type: String,
                required: false
            },
            styles: {
                type: [Array, String],
                required: false
            },
        }
    }
</script>