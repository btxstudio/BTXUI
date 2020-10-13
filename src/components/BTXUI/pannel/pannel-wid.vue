<template>
    <b-view :styles="`fixed max t-0 l-0 trans-fast flex-${pos} ${matte? '': 'bg-none'} z${matteZIndex} alpha-0`"
            :states="{
                show: {
                    style: 'alpha-1',
                    state: visible
                }
            }"
            >

        <!--遮罩背景-->
        <b-hot @on_click="matteClose === 'click' && $_close()"
               @on_dblclick="matteClose === 'dblclick' && $_close()"
               :forbid="matteClose? false: true"
               :styles="`abs max t-0 l-0 bg-color-${matteColor}`">
            <b-view styles="max bg-repeat" :bg-img="mattePattern"></b-view>
        </b-hot>

        <b-view :styles="`rel trans-fast bg-use ${max_pannel_styles} l-${offset.x} t-${offset.y} ${transition.out_styles}`"
            :states="{
                show: {
                    style: `${matte? 'trans-delay-.4': ''} ${transition.in_styles}`,
                    state: visible
                }
            }">

            <!--关闭按钮-->
            <b-hot v-if="closeBtn" @on_click="$_close" styles="abs flex-5 r-.4 t-.4 w-2 h-2 bg-color-neutral color-dark round z1"
                hover="bg-color-red color-light">
                <b-icon icon="close" />
            </b-hot>

            <slot/>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BIcon from "@/components/BTXUI/core/b-icon";

    const desc = ["该组件用于自定义弹窗交互操作。"],
        extend = [],
        dependent = ["b-icon", "b-hot", "b-view"],
        api = null,
        init_data = `{
        visible: "（model）面板显示状态",
        /* pos: "面板定位（基于视口九宫格定位: 1-9）" */,
        /* offset: {
            x: "水平方向位移样式值，默认单位 rem",
            y: "垂直方向位移样式值，默认单位 rem",
        } */,
        /* transition: {
            in_styles: "入场样式值",
            out_styles: "出场样式值"
        } */,
        /* matte: "是否启用遮罩，默认不启用" */,
        /* matteColor: "遮罩颜色" */,
        /* mattePattern: "遮罩图案" */,
        /* matteZIndex: "遮罩 z 轴层级，默认为 9" */,
        /* closeBtn: "是否启用关闭按钮" */,
        /* matteClose: "遮罩自身点击关闭面板：click 单击、dblclick 双击" */,
        /* maxEnable: "{
            width: "满屏弹窗宽度样式数值",
            height: "满屏弹窗高度样式数值",
            bg: "弹窗背景色样式色值",
        }" */,
    }`;

    export default {
        name: "pannel-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BHot,
            BIcon
        },
        model:{
            prop: "visible",
            event: "on_click"
        },
        props: {
            pos: {
                type: [Number, String],
                required: false,
                default: 5
            },
            offset: {
                type: Object,
                required: false,
                default: ()=>{
                    return {x:0, y:0}
                }
            },
            transition: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        in_styles: "alpha-1 scale-1",
                        out_styles: "alpha-0 scale-0"
                    }
                }
            },
            visible: {
                type: Boolean,
                required: true
            },
            matte: {
                type: Boolean,
                required: false
            },
            matteColor: {
                type: String,
                required: false
            },
            mattePattern: {
                type: String,
                required: false
            },
            matteZIndex: {
                type: [String, Number],
                required: false,
                default: 9
            },
            closeBtn: {
                type: Boolean,
                required: false,
            },
            matteClose: {
                type: String,
                required: false,
            },
            maxEnable: {
                type: Object,
                required: false
            }
        },
        data(){
            return {

                //满屏弹窗样式
                max_pannel_styles: this.maxEnable? `w-${this.maxEnable.width} h-${this.maxEnable.height} bg-color-${this.maxEnable.bg}`: ''

            }
        },
        watch: {

            //含遮罩或全屏状态时禁止 body 滚动
            visible(state){
                if(this.matte || this.maxEnable){
                    document.body.style.overflow = state === true? "hidden": "auto";
                }
            }

        },
        methods: {

            //关闭面板
            $_close(){
                this.$emit("on_click", false);
            },

        }
    }
</script>