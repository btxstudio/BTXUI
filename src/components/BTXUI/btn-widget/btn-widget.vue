<template>
    <b-hot @on_click="$_click"
           :styles="`pad-v-.5 pad-h-1.7 round-sm line thick-1 color-${btn_color[0]} bg-color-${btn_color[1]} line-${btn_color[2]}`"
           :hover="`color-${btn_color[3]} bg-color-${btn_color[4]} line-${btn_color[5]}`" >
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
        },
        data(){
            return {

                //按钮色彩风格
                btn_color: ["dgray", "neutral", "neutral", "light", "blue", "blue"].map((color, index)=>{
                    return this.btnColor[index] || color;
                }),

            }
        },
        methods: {

            //执行点击
            $_click(){
                this.$emit("on_click");
            }

        }
    }
</script>