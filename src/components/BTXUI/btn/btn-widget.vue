<template>
    <b-hot @on_click="$_click"
           v-bind="hotData"
           :styles="`pad-h-1.7 ${btnRound? 'round-lg': 'round-sm'} ${btnWidth? 'flex-5 pad-v-.2 w-' + btnWidth: 'pad-v-.6'} ${btn_color[0]} ${btn_color[1]} ${btn_color[2]}`"
           :hover="`${btn_color[3]} ${btn_color[4]} ${btn_color[5]}`" >
        {{btnText}}
    </b-hot>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot";

    export default {
        name: "btn-widget",
        components: {
            BHot,
        },
        /*
        * init-data{
        *   btn-text: "按钮文字",
        *   [* btn-color: ["文字色", "背景色", "描边色", "hover文字色", "hover背景色", "hover描边色"]],
        *   [* btn-round: "启用大圆角效果"],
        *   [* btn-width: "按钮固定宽度"],
        *   [* hot-data: (参照：b-hot 组件入参)],
        * }
        * */
        props: {
            btnText: {
                type: String,
                required: true,
            },
            btnColor: {
                type: Array,
                required: false,
                default: () => []
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
                btn_color: ["dgray", "neutral", "none", "light", "blue", "none"].map((bg_color, index)=>{
                    let color = this.btnColor[index] || bg_color;
                    if(index % 3 === 0){ //文字色
                        return `color-${color}`
                    }
                    if(index % 3 === 1){ //背景色
                        if(Array.isArray(color)){ //渐变色
                            return `bg-gradient-left,${color.join(",")}`;
                        }else{ //纯色
                            return `bg-color-${color}`;
                        }
                    }
                    if(index % 3 === 2){ //描边色
                        if(color !== "none") return `line-${color} line line-outside thick-1`
                    }
                }),

            }
        },
        methods: {

            //执行点击
            $_click(){
                this.$emit("on_click");
            },

        }
    }
</script>