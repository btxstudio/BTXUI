<template>
    <b-hot @on_click="$_click"
           v-bind="hotData"
           :styles="`pad-h-1.4 pad-v-.4 line thick-1 ellipsis ${btnRound? 'round-lg': 'round-sm'} ${btnWidth? 'flex-5 w-' + btnWidth: ''} color-${btn_color.normal.text} ${$_set_bg(btn_color.normal.bg)} line-${btn_color.normal.line}`"
           :hover="`color-${btn_color.hover.text} ${$_set_bg(btn_color.hover.bg)} line-${btn_color.hover.line}`">
        {{btnText}}
    </b-hot>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot";

    const desc = ["该组件用于实现按钮交互操作。"],
        extend = [],
        dependent = ["b-hot"],
        api = null,
        init_data = `{
        btnText: "按钮文字",
        /* btnColor: {
            normal: {
                text: "默认文字色样式色值",
                bg: "默认背景色样式色值",
                line: "默认描边色样式色值",
            },
            hover: {
                text: "悬停文字色样式色值",
                bg: "悬停背景色样式色值",
                line: "悬停描边色样式色值",
            },
        } */,
        /* btnRound: "启用大圆角效果" */,
        /* btnWidth: "按钮固定宽度" */,
        /* hotData: "(参照：b-hot 组件入参)" */,
    }`;

    export default {
        name: "btn-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BHot,
        },
        props: {
            btnText: {
                type: String,
                required: true,
            },
            btnColor: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        normal:{},
                        hover:{},
                    }
                }
            },
            btnRound: {
                type: Boolean,
                required: false
            },
            btnWidth: {
                type: [String, Number],
                required: false
            },
            hotData: {
                type: Object,
                required: false
            }
        },
        data(){
            return {

                //按钮色彩风格
                btn_color: {
                    normal: {
                        text: "dgray",
                        bg: "lgray",
                        line: "none",
                        ...this.btnColor.normal
                    },
                    hover: {
                        text: "blue",
                        bg: "#e7e7e7",
                        line: "none",
                        ...this.btnColor.hover
                    }
                }

            }
        },
        methods: {

            //执行点击
            $_click(){
                this.$emit("on_click");
            },

            //设置背景样式
            $_set_bg(color){
                if(Array.isArray(color)){ //渐变色
                    return `bg-gradient-left,${color.join(",")}`;
                }else{ //纯色
                    return `bg-color-${color}`;
                }
            }

        }
    }
</script>