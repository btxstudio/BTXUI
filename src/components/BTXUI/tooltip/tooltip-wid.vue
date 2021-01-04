<template>
    <b-view ref="tooltip" styles="fixed bg-none z9" v-show="visible">
        <!--连线-->
        <b-view :styles="`abs h-1px alpha-.5 shadow-sm color-rgba(40,40,40,.2) origin-left|center bg-${color_styles.bg} w-${line_len} rotate-${line_rotate}`"></b-view>

        <!--文字内容-->
        <b-view :styles="`rel pad-v-.7 pad-h-1.4 round-sm shadow line thick-1 color-neutral line-${color_styles.line} bg-${color_styles.bg} ${box_offset}`">
            <b-text :styles="`color-${color_styles.text}`" v-html="text"></b-text>
        </b-view>

        <!--光标点-->
        <b-view :styles="`abs alpha-.4 round w-1 h-1 l-f.5 t-f.5 bg-color-${color_styles.point}`"></b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BText from "@/components/BTXUI/core/b-text"

    const desc = ["该组件用于悬浮显示 tooltip 提示框。"],
        extend = [],
        dependent = ["b-text", "b-view"],
        api = {
            methods: [
                {
                    name: "show",
                    ef: "显示提示框",
                    params: "text",
                    return: "-"
                },
                {
                    name: "hide",
                    ef: "隐藏提示框",
                    params: "-",
                    return: "-"
                },
                {
                    name: "set_pos",
                    ef: "定位提示框",
                    params: "x, y",
                    return: "-"
                }
            ]
        },
        init_data = `{
        /* colors: {
            text: "文字颜色",
            bg: "背景颜色",
            line: "描边颜色",
            point: "光标点颜色"
        } */,
        /* offset: {
            x: "提示框水平偏移，默认：40",
            y: "提示框垂直偏移，默认：-40",
        }*/
    }`;

    export default {
        name: "tooltip-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText
        },
        props: {
            colors: {
                type: Object,
                required: false
            },
            offset: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        x: 40,
                        y: -40
                    }
                }
            },
        },
        data(){
            const offset_x = this.offset.x,
                offset_y = this.offset.y;

            return {

                //提示框显示状态
                visible: false,

                //提示内容
                text: "",

                //提示框偏移
                box_offset: `l-${offset_x.toString().replace('-', 'f')}px t-${offset_y.toString().replace('-', 'f')}px`,

                //连线旋转角度
                line_rotate: (Math.atan2(offset_y + 4, offset_x + 4) * 180 / Math.PI).toString().replace("-", "f"),

                //连线长度
                line_len: Math.sqrt(Math.pow(offset_x, 2) + Math.pow(offset_y, 2)) + "px"

            }
        },
        computed: {

            //组件色彩风格
            color_styles(){
                return {
                    line: "neutral",
                    text: "dgray",
                    bg: "light",
                    point: "yellow",
                    ...this.colors
                }
            },

            //组件
            tooltip(){
                return this.$refs.tooltip;
            }

        },
        methods: {

            //显示提示框
            show(text){
                if(this.visible === false){
                    this.visible = true;
                    this.text = text;
                }
            },

            //隐藏提示框
            hide(){
                if(this.visible === true) this.visible = false;
            },

            //位移提示框
            set_pos(x, y){
                this.tooltip.append_state(`l-${x}px t-${y}px`, "move");
                this.tooltip.toggle_style("move");
            }

        }
    }
</script>