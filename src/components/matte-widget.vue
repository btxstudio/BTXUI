<template>
    <div class="matte-widget max-screen flex trans-fast trans-delay-d4 alpha-0 bg-repeat"
        :style="{backgroundColor: bg_color, backgroundImage: `url(${bgPattern})`}"
        :show="show"
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
        *   [* show-state: "显示状态"],
        *   [* bg-color: "背景色，默认：rgba(0,0,0,.7)"],
        *   [* bg-pattern: "背景图案"],
        *   [* click-hide-callback: "单击遮罩关闭回调"],
        *   [* dblclick-hide-callback: "双击遮罩关闭回调"],
        * }
        * */
        props: {
            showState: {
                type: Boolean,
                required: false,
                default: false
            },
            bgColor: {
                type: String,
                required: false,
                default: "rgba(0,0,0,.7)"
            },
            bgPattern: {
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
                show: this.showState,

                //遮罩背景色
                bg_color: this.bgColor

            }
        },
        watch: {

            //监听显示状态
            showState(state){
                this.show = state;
            }

        },
        methods: {

            //配置点击\双击遮罩执行关闭
            $_hide_self(method){
                let callback = this[method === "dbl"? "dblclickHideCallback": "clickHideCallback"];
                if(callback){
                    callback();
                    this.show = false;
                }
            }

        }
    }
</script>

<style lang="scss" scoped>

    //遮罩显示状态
    .matte-widget[show]{
        transition-delay: 0s;
        transition-duration: 0s;
        visibility: visible;
        opacity: 1;
    }

</style>