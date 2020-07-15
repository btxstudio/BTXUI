<template>
    <b-view :styles="`fixed max t-0 l-0 trans-fast flex-${pos} ${matte? '': 'bg-none'} z-${matteZIndex} hide alpha-0`"
            :states="{
                show: {
                    style: 'alpha-1 show',
                    state: visible
                }
            }"
            >

        <!--遮罩背景-->
        <b-hot @on_click="matteClose === 'click' && $_close()"
               @on_dblclick="matteClose === 'dblclick' && $_close()"
               :forbid="matteClose? false: true">
            <b-view :styles="`abs max t-0 l-0 bg-color-${matteColor}`"/>
        </b-hot>

        <b-view :styles="`rel trans-fast scale-0 bg-use l-${offsetStyles.x} t-${offsetStyles.y}`"
            :states="{
                show: {
                    style: ['alpha-1', 'scale-1', matte? 'trans-delay-.4': ''],
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

    export default {
        name: "pannel-widget",
        components: {
            BView,
            BHot,
            BIcon
        },
        /*
        * init-data{
        *   visible（model）: "面板显示状态",
        *   [* pos: "面板定位（基于视口九宫格定位: 1-9）"],
        *   [* offset-styles: {
        *       x: "水平方向位移样式，默认单位 rem",
        *       y: "垂直方向位移样式，默认单位 rem",
        *   }],
        *   [* matte: "是否启用遮罩，默认不启用"],
        *   [* matte-color: "遮罩颜色"],
        *   [* matte-z-index: "遮罩 z 轴层级，默认为 9"],
        *   [* close-btn: "是否启用关闭按钮"],
        *   [* matte-close: "遮罩自身点击关闭面板：click 单击、dblclick 双击"],
        * }
        * */
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
            offsetStyles: {
                type: Object,
                required: false,
                default: () => {
                    return {x:0, y:0}
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