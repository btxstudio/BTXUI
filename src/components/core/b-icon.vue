<template>
    <b-text v-if="icon" :styles="styles">
        <!--字体图标-->
        <i :class="`ico-${icon}`"></i>
    </b-text>

    <!--图片图标-->
    <b-img v-else-if="img" :img="img" :styles="styles" />
</template>

<script>
    import BText from "@/components/core/b-text";
    import BImg from "@/components/core/b-img";

    export default {
        name: "b-icon",
        components: {
            BText,
            BImg
        },
        /*
        * init-data{
        *   [* icon: "字体图标名（无需 ico 前缀）"],
        *   [* img: "图片图标数据"],
        *   [* styles: [
        *       样式规范，基于并扩展 btx·UI 全局样式语法,...
        *   ]],
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