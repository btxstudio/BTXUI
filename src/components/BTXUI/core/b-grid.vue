<template>
    <b-view :styles="`${styles} rel`">
        <!--容器描边-->
        <b-view styles="abs max bg-none z1 t-0 l-0"
                :states="{
                    line: {
                        style: `line line-${outlineColor} thick-${line[1] + 1}`,
                        state: outlineColor
                    }
                }">
        </b-view>

        <!--网格-->
        <b-view styles="grid">
            <b-view v-for="(item,i) of colData.items" :key="i"
                    :class="colData.common_plan || item.plan"
                    :styles="`rel line-b line-r line-${line[0]} thick-${line[1]} h-${gridHeight} pad-${gap}`">
                <slot :name="item.id || item.Id" />
            </b-view>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "./b-view";

    let desc = ["该组件可用于实现响应式栅格布局。"],
        extend = [],
        dependent = ["b-view"],
        api = null,
        init_data = `{
        colData: {
            items: [
                {
                    id|Id: "单元格 id",
                    plan: "局部栅格方案，可参考栅格系统全局样式 .col-*",
                    ....
                },...
            ],
            common_plan: "公共栅格方案，可参考栅格系统全局样式 .col-*"
        },
        /* styles: "(参照：b-style 组件入参)" */,
        /* gridHeight: "栅格固定高度" */,
        /* gap: "栅格内边距，默认为 0" */,
        /* line: ["网格描边颜色", "网格描边粗细"] */,
        /* outlineColor: "容器描边色" */,
    }`;

    export default {
        name: "b-grid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView
        },
        props: {
            colData: {
                type: Object,
                required: true
            },
            styles: {
                type: String,
                required: false
            },
            gap: {
                type: [Number, String],
                required: false,
                default: 0
            },
            gridHeight: {
                type: [Number, String],
                required: false
            },
            line: {
                type: Array,
                required: false,
                default: () => ["none", 0]
            },
            outlineColor: {
                type: String,
                required: false
            },
        }
    }
</script>