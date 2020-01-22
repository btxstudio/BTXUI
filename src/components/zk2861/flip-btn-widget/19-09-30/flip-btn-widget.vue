<!--19-09-30-->
<template>
    <div class="flip-btn-widget ani-scale-fade-in" @click="$_click">
        <i class="ico-arrow-left fb-w-ico" :flip-dir="flipDir"></i>
    </div>
</template>

<script>
    export default {
        name: "flip-btn-widget",
        /*
        * init-data{
        *   flip-dir: "按钮方向：left、right",
        * }
        * */
        props: {
            flipDir: {
                type: String,
                required: true
            },
        },
        methods: {

            //按钮点击
            $_click(){
                this.$emit("on_click");
            }

        }
    }
</script>

<style scoped>
    @import "../assets/css/flip-btn-widget.css";
</style>