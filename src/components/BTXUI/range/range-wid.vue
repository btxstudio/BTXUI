<template>
    <b-view styles="max-w">

        <!--刻度-->
        <b-view v-if="tick" styles="rel t-.6 h-1.2"></b-view>

        <!--轨道-->
        <b-view :styles="`max-w h-2px round-lg bg-color-${colors.track}`"></b-view>

        <!--滑块-->
        <b-hot ref="block"
               :styles="`flex rel t-f.6 w-3 h-1.2 round-lg bg-color-${colors.bar}`"
               :hover="`bg-color-${colors.hover}`"></b-hot>

    </b-view>
</template>

<script>
    import DragMover from "@/components/BTXUI/core/lib/DragMover"
    import BView from "@/components/BTXUI/core/b-view"
    import BHot from "@/components/BTXUI/core/b-hot"

    const desc = ["该组件用于实现区间值拖动选取。"],
        extend = [],
        dependent = ["DragMover", "b-view", "b-hot"],
        api = {
            event: [
                {
                    name: "on_change",
                    ef: "区间值变化时",
                    params: "cur_value"
                }
            ]
        },
        init_data = `{
        min: "拖动区间最小值",
        max: "拖动区间最大值",
        /* step: "拖动步进值" */,
        /* tick: "是否显示刻度，默认 false" */,
        /* colors: {
            bar: "滑块颜色",
            track: "轨道颜色",
            hover: "滑块悬停颜色"
        } */
    }`;

    export default {
        name: "range-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BHot
        },
        props: {
            min: {
                type: [Number, String],
                required: true,
            },
            max: {
                type: [Number, String],
                required: true,
            },
            step: {
                type: [Number, String],
                required: false
            },
            tick: {
                type: Boolean,
                required: false
            },
            colors: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        bar: "mgray",
                        track: "neutral",
                        hover: "#ccc"
                    }
                }
            }
        },
        data(){
            return {

                //滑动长度
                drag_len: 0,

                //当前滑动距离
                cur_drag_len: 0,

            }
        },
        computed: {

            //拖拽滑块
            $block(){
                return this.$refs.block;
            }

        },
        methods: {

            //初始化
            $_init(){
                this.drag_len = this.$el.clientWidth - this.$block.$el.clientWidth;
            }

        },
        mounted(){
            this.$_init();
        }
    }
</script>