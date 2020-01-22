<!--19-12-13-->
<template>
    <div :class="`main-btn-widget ${styleState}`" @click="$_click">
        <div class="mb-w-decorate" pos-top></div>
        <div class="mb-w-decorate" pos-bottom></div>
        <div class="mb-w-inner" :style="{backgroundColor: btnColor, height: btnHeight}"></div>
        <div class="mb-w-text">{{btnText}}</div>
    </div>
</template>

<script>
    import simpleBtn from "@/components/simple-btn-widget";

    export default {
        extends: simpleBtn,
        name: "main-btn-widget",
        /*
        * init-data{
        *   @overwrite btn-text: "按钮文字",
        *   @overwrite [* btn-color: "按钮颜色"],
        *   @overwrite [* style-state: "表格特殊样式，预置：md、sm"],
        *   [* btn-height: "按钮高度"]
        * }
        * */
        props: {
            btnHeight: {
                type: String,
                required: false
            },
        }
    }
</script>

<style scoped>
    @import "../assets/css/main-btn-widget.css";
</style>