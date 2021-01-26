<template>
    <b-view styles="flex-5 max-w">

        <!--滑块-->
        <b-view :styles="`round-lg bg-color-${colors.bar}`"></b-view>

        <!--刻度-->
        <b-view v-if="tick"></b-view>

        <!--轨道-->
        <b-view :styles="`round-lg bg-color-${colors.track}`"></b-view>

    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"

    const desc = ["该组件用于实现区间值拖动选取。"],
        extend = [],
        dependent = ["b-view"],
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
            track: "轨道颜色"
        } */
    }`;

    export default {
        name: "range-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView
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
                        track: "neutral"
                    }
                }
            }
        }
    }
</script>