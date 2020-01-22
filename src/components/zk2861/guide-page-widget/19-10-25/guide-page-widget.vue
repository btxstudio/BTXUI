<!--19-10-25-->
<template>
    <div class="guide-page-widget" :style="'z-index:' + zIndex">
        <img class="gp-w-container" :style="ani_style" :src="showSrc" @animationend="$show_complete" />
    </div>
</template>

<script>
    export default {
        name: "guide-page-widget",
        /*
        * init-data{
        *   show-src: "显示图片路径",
        *   show-duration: "页面展示时间",
        *   [z-index: "页面 z 轴层级",]
        * }
        * */
        props: {
            showSrc: {
                type: String,
                required: true
            },
            showDuration: {
                type: String,
                required: true
            },
            zIndex: {
                type: String,
                required: false
            }
        },
        data(){
            return {

                //动画样式
                ani_style: {
                    animationDuration: this.showDuration,
                    webkitAnimationDuration: this.showDuration
                }

            }
        },
        methods: {

            //动画显示结束
            $show_complete(){
                this.$el.style.display = "none";
                this.$emit("on_show_complete");
            }

        }
    }
</script>

<style scoped>
    @import "../assets/css/guide-page-widget.css";
</style>