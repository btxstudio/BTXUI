<!--19-09-30-->
<template>
    <div class="main-title-widget" :style="style">
        <div class="mt-w-box"></div>
        <div class="mt-w-text">{{mainTitle}}</div>
    </div>
</template>

<script>
    export default {
        name: "main-title-widget",
        /*
        * init-data{
        *   main-title: "组件标题",
        *   [main-width: "组件宽度",]
        * }
        * */
        props: {
            mainTitle: {
                type: String,
                required: true
            },
            mainWidth: {
                type: String,
                required: false
            },
        },
        computed: {

            //组件样式
            style(){
                return {
                    width: this.mainWidth
                }
            }

        }
    }
</script>

<style scoped>
    @import "../assets/css/main-title-widget.css";
</style>