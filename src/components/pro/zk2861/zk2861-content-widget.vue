<template>
    <ul class="bg-color-light pad-v-2 pad-h-4">
        <li v-for="data of dataTree" :key="data.id"
            style="background-image: -webkit-linear-gradient(top, #f7f7f7, #eee)"
            class="round-sm mrg-b-d5 pad-1">
            <zk2861-content-node-widget :data-node="data"
                                        :select-filter="selectFilter"
                                        @on_select="$_select" />
        </li>
    </ul>
</template>

<script>
    import ContentWidget from "@/components/BTXUI/content-widget"
    import Zk2861ContentNodeWidget from "@/components/pro/zk2861/zk2861-content-node-widget"

    export default {
        extends: ContentWidget,
        components: {
            Zk2861ContentNodeWidget
        },
        name: "zk2861-content-widget",
        /*
        * init-data{
        *   data-tree: [
        *       {
        *           id: "数据标识" 【注：必须满足树形嵌套结构，即：dataID + 结构层级索引。exp：dataID_1_2_1_1】,
        *           text: "数据标题",
        *           [* children: ["同外层结构",...]],
        *           [* checkbox: "是否显示复选框"],
        *           [* spread: "是否展开子级（默认关闭）"],
        *           [* tooltip: "悬停提示文本（支持超文本）"],
        *           [* flag: "扩展标识符：key:value"],
        *           [* selected: "是否选中（默认未选中）"]
        *       },...
        *   ],
        *   [* select-filter: "选择过滤回调函数，返回 true 执行勾选"],
        * }
        * */
    }
</script>