<!--19-12-25-->
<template>
    <div class="simple-btn-widget" :style="btn_style" @click="$_click">
        <router-link v-if="routerLink" :to="routerLink">{{btnText}}</router-link>
        <span v-else>{{btnText}}</span>
    </div>
</template>

<script>
    export default {
        name: "simple-btn-widget",
        /*
        * init-data{
        *   btn-text: "按钮文字",
        *   [* btn-color: "按钮颜色"],
        *   [* text-color: "文字颜色"],
        *   [* router-link: "组件路由"],
        * }
        * */
        props: {
            btnText: {
                type: String,
                required: true
            },
            btnColor: {
                type: String,
                required: false
            },
            textColor: {
                type: String,
                required: false
            },
            routerLink: {
                type: String,
                required: false
            }
        },
        computed: {

            //按钮样式
            btn_style(){
                return {
                    backgroundColor: this.btnColor,
                    color: this.textColor,
                }
            }

        },
        methods: {

            //点击按钮
            $_click(){
                this.$emit("on_click", {
                    btn_text: this.btnText
                });
            }

        }
    }
</script>

<style scoped>
    @import "../assets/css/simple-btn-widget.css";
</style>