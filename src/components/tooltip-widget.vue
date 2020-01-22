<!--19-09-19-->
<template>
    <div class="tooltip-widget" :style="translate" v-show="visible">
        <span class="t-w-line" :style="line_style"></span>
        <span class="t-w-text" :style="text_style" v-html="text"></span>
    </div>
</template>

<script>
    export default {
        name: "tooltip-widget",
        data(){
            return {

                //提示框显示状态
                visible: false,

                //提示内容
                text: "",

                //组件定位
                translate: {
                    transform: ""
                },

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
                this.translate.transform = "translate(" + x + "px, " + y + "px)";
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

<style lang="scss" scoped>
    .tooltip-widget{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        height: 0;

        .t-w-text{
            display: block;
            max-width: 20rem;
            padding: .7rem 1.4rem;
            font-size: 1.4rem;
            border-radius: 7px;
            background-color: rgba(224,224,224,.97);
            border: 1px solid #eee;
            color: #444;
            box-shadow: 0 7px 14px rgba(0,0,0,.1);
        }
        .t-w-line{//连线
            position: absolute;
            background-color: #eee;
            box-shadow: 0 1px 4px rgba(0,0,0,.14);
            transform-origin: left center;
            width: 20px;
            height: 1px;
        }
        &::after{//光标点
            content: "";
            position: absolute;
            border-radius: 50%;
            width: 9px;
            height: 9px;
            left: 100px;
            top: -5px;
            box-shadow: -105px 2px 0 rgba(255,255,0,.24);
        }
    }
</style>