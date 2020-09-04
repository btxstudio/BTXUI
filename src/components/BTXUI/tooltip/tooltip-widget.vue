<template>
    <b-view :styles="`fixed t-0 l-0 z-9 h-0 ${translate}`" v-show="visible">
        <b-view styles="abs bg-color-neutral shadow w-2 h-1px origin-left|center" :style="line_style"></b-view>
        <b-view v-html="text"
                styles="pad-v-.7 pad-h-1.4 round-sm bg-color-rgba(224,224,224,.97) shadow line line-neutral thick-1" :style="text_style" ></b-view>
        <!--max-width: 20rem;-->
        <!--光标点-->
        <b-view styles="abs round w-1 h-1 l-100px t-f5px shadow"></b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BText from "@/components/BTXUI/core/b-text"

    export default {
        name: "tooltip-widget",
        components: {
            BView,
            BText
        },
        data(){
            return {

                //提示框显示状态
                visible: false,

                //提示内容
                text: "",

                //组件定位
                translate: "",

                //组件样式
                text_style: {
                    transform: "",
                    borderColor: "",
                    color: "",
                    backgroundColor: ""
                },

                //连线样式
                line_style: {
                    width: "",
                    backgroundColor: "",
                    transform: ""
                }

            }
        },
        methods: {

            /*
            显示提示框
            style: {
                [border_color: 描边色,]
                [bg_color: 背景色,]
                [text_color: 文字颜色]
            }
            */
            show(text, style){
                if(this.visible === false){
                    this.visible = true;
                    this.text = text;

                    //设置样式
                    if(style){
                        let border_color = style.border_color || "#eee",
                            text_color = style.text_color || "#444",
                            bg_color = style.bg_color || "rgba(224,224,224,.97)";
                        this.text_style = {
                            borderColor: border_color,
                            backgroundColor: bg_color,
                            color: text_color
                        }
                        this.line_style.backgroundColor = border_color;
                    }

                }
            },

            //隐藏提示框
            hide(){
                if(this.visible === true) this.visible = false;
            },

            //位移提示框
            set_pos(x, y, x_offset, y_offset){
                this.translate = "translate(" + x + "px, " + y + "px)";
                x_offset = x_offset || 40;
                y_offset = y_offset || -40;
                this.text_style.transform = "translate(" + x_offset + "px, " + y_offset + "px)";
                this.$set_line(x_offset, y_offset);
            },

            //设置连线
            $set_line(width, height){
                this.line_style.transform = "rotate(" + (Math.atan2(height + 4, width + 4) * 180 / Math.PI) + "deg)";
                this.line_style.width = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) + "px";
            }

        }
    }
</script>