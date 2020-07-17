<template>
    <input :style="computed_style" v-model="value" autocomplete="off" />
</template>

<script>
    import bStyle from "./styles/b-style";

    export default {
        extends: bStyle,
        name: "b-input",
        /*
        * init-data{
        *   [* styles: [
        *       样式规范，基于并扩展 btx·UI 全局样式语法,...
        *   ]],
        * }
        * */
        model: {
            prop: "inpVal",
            event: "on_input"
        },
        props: {
            inpVal: {
                type: [String, Number],
                required: false,
            }
        },
        data(){
            return {
                value: this.inpVal
            }
        },
        watch: {
            value(val){
                this.$emit("on_input", val)
            }
        }
    }
</script>