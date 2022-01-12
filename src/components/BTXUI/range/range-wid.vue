<template>
    <b-view :styles="`max-w rel flex-4 round-lg bg-color-${colors.track} pad-r-${blockSize.width} h-${blockSize.height}`">

        <!--刻度-->
        <b-view v-if="tick" styles="rel t-.6 h-1.2"></b-view>

        <!--轨道线-->
        <b-view :styles="`rel max-w h-2px round-lg bg-color-neutral l-${blockSize.width / 2}`"></b-view>

        <!--滑块-->
        <b-drag :styles="`color-neutral round-lg line thick-1 line-${colors.normal.line} w-${blockSize.width} h-${blockSize.height} bg-color-${colors.normal.bg}`"
                :drag-start="`shadow line-${colors.act.line} bg-color-${colors.act.bg}`"
                @on_move="$_drag_move"
                :free-drag="true"></b-drag>

    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BDrag from "@/components/BTXUI/core/b-drag"
    import BHot from "@/components/BTXUI/core/b-hot"

    const desc = ["该组件用于实现区间值拖动选取。"],
        extend = [],
        dependent = ["b-drag", "b-view", "b-hot"],
        api = null,
        init_data = `{
        curVal: "(model) 当前拖动数值",
        min: "拖动区间最小值",
        max: "拖动区间最大值",
        /* step: "拖动步进值" */,
        /* tick: "是否显示刻度，默认 false" */,
        /* blockSize: {
            width: "滑块宽度",
            height: "滑块高度",
        } */,
        /* colors: {
            normal: {
                bg: "滑块颜色",
                line: "滑块描边色"
            },
            act: {
                bg: "滑块激活颜色",
                line: "滑块激活描边色"
            },
            track: "轨道颜色"
        } */
    }`;

    export default {
        name: "range-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BDrag,
            BHot
        },
        model: {
            prop: "curVal",
            event: "on_drag"
        },
        props: {
            curVal: {
                type: Number,
                required: true,
            },
            min: {
                type: Number,
                required: true,
            },
            max: {
                type: Number,
                required: true,
            },
            step: {
                type: Number,
                required: false
            },
            blockSize: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        width: 5,
                        height: 2
                    }
                }
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
                        normal: {
                            bg: "lgray",
                            line: "mgray",
                        },
                        act: {
                            bg: "light",
                            line: "neutral",
                        },
                        track: "neutral",
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
        methods: {

            //拖动
            $_drag_move(cur_pos, limit_area){
                const max = Math.round(this.max),
                    min = Math.round(this.min);
                this.$emit("on_drag", Math.round(max * cur_pos.x / limit_area.x) + min);
            }

        }
    }
</script>