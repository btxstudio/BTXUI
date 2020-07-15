<!--19-12-04-->
<template>
    <div class="matte-pannel-widget">

        <!--浮层遮罩组件-->
        <matte-widget :show-state="visiable" :bg-color="matteColor" z-index="99" :dblclick-hide-callback="pannelCloseCallback">
            <div class="mp-w-pannel" :visiable="visiable" :style="pannelSize">
                <span v-if="closeBtnEnable" class="mp-w-close" @click="$_close"><i class="ico-guanbi"></i></span>
                <div class="mp-w-container flex flex-column">
                    <slot></slot>
                </div>
            </div>
        </matte-widget>

    </div>
</template>

<script>
    import matte from "@/components/matte-widget";

    export default {
        name: "matte-pannel-widget",
        /*
        * init-data{
        *   pannel-size {
        *       width: "面板宽度",
        *       height: "面板高度"
        *   },
        *   show-state: "显示状态",
        *   [pannel-close-callback: 面板关闭回调操作],
        *   [matte-color: "背景色，默认：rgba(0,0,0,.7)"],
        *   [close-btn-enable: "是否启用右上角按钮，默认为 true"]
        * }
        * */
        props: {
            pannelSize: {
                type: Object,
                required: true
            },
            showState: {
                type: Boolean,
                required: true
            },
            pannelCloseCallback: {
                type: Function,
                default: ()=>{},
                required: false
            },
            matteColor: {
                type: String,
                required: false
            },
            closeBtnEnable: {
                type: Boolean,
                default: true,
                required: false
            }
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

            //关闭组件
            $_close(){
                this.pannelCloseCallback();
                this.visiable = false;
            }

        },
        components: {
            "matte-widget": matte,
        }
    }
</script>

<style scoped>
    @import "../assets/css/matte-pannel-widget.css";
    @import "../assets/css/matte-pannel-widget-extend.css";
</style>