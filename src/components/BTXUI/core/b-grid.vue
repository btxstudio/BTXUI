<template>
    <b-view :styles="`${styles} rel`">
        <!--容器描边-->
        <b-view styles="abs max bg-none"
                :states="{
                    line: {
                        style: `line line-${outlineColor} thick-${line[1] + 1}`,
                        state: outlineColor
                    }
                }">
        </b-view>

        <!--网格-->
        <b-view styles="grid">
            <b-view v-for="item of colData.items" :key="item.id"
                    :class="colData.common_plan || item.plan"
                    :styles="`line-b line-r line-${line[0]} thick-${line[1]} h-${gridHeight} `">
                <slot :name="item.id" />
            </b-view>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "./b-view";

    export default {
        name: "b-grid",
        components: {
            BView
        },
        /*
        * init-data{
        *   col-data: {
        *       items: [
        *           {
        *               id: "单元格 id",
        *               plan: "局部栅格方案，可参考栅格系统全局样式 .col-*"
        *           },...
        *       ],
        *       [* common_plan: "公共栅格方案，可参考栅格系统全局样式 .col-*"],
        *   },
        *   [* styles: (参照：b-style 组件入参)],
        *   [* grid-height: "栅格固定高度"],
        *   [* line: "网格描边样式：[color, thick]"],
        *   [* outline-color: "容器描边色"],
        * }
        * */
        props: {
            colData: {
                type: Object,
                required: true
            },
            styles: {
                type: String,
                required: false
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