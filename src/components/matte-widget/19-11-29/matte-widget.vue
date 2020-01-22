<!--19-11-29-->
<template>
    <div class="matte-widget"
        :style="'background-color:' + bgColor + '; z-index:' + zIndex"
        :visiable="visiable"
        @click="$_hide_self()"
        @dblclick="$_hide_self('dbl')"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "matte-widget",
        /*
        * init-data{
        *   show-state: "显示状态",
        *   [bg-color: "背景色，默认：rgba(0,0,0,.7)"],
        *   [z-index: "z 轴层级，默认：9"],
        *   [click-hide-callback: "单击遮罩关闭回调"],
        *   [dblclick-hide-callback: "双击遮罩关闭回调"],
        * }
        * */
        props: {
            showState: {
                type: Boolean,
                required: true
            },
            bgColor: {
                type: String,
                required: false
            },
            zIndex: {
                type: String,
                required: false
            },
            clickHideCallback: {
                type: Function,
                required: false
            },
            dblclickHideCallback: {
                type: Function,
                required: false
            },
        },
        data(){
            return {

                //遮罩显示状态
                visiable: false

            }
        },
        watch: {

            //监听显示状态
            showState(state){
                this.visiable = state;
            }

        },
        methods: {

            //配置点击\双击遮罩执行关闭
            $_hide_self(method){
                let callback = this[method === "dbl"? "dblclickHideCallback": "clickHideCallback"];
                if(callback) {
                    callback();
                    this.visiable = false;
                }
            }

        }
    }
</script>

<style scoped>
    @import "../assets/css/matte-widget.css";
</style>