<template>
    <article>
        <header-info v-bind="header_info" />

        <!--响应式栅格布局-->
        <section>
            <h5>响应式栅格布局</h5>
            <p>通过 <code>colData</code> 属性可设置栅格布局，包括均分和非均分 2 种形式，<b>items</b> 字段用于对每个项目进行栅格设置；<b>common_plan</b> 字段则用于对所有项目进行统一栅格设置。设置值可参考全局样式的栅格系统，且支持响应式分段。</p>
            <p>通过 <code>gap</code> 属性可设置栅格元素的内边距，默认单位 rem。</p>
            <p>【exp】：</p>
            <b-grid styles="resize bg-color-dgray round-sm pad-.5" v-bind="data_1">
                <div v-for="item of data_1.colData.items" :key="item.id" :slot="item.id"
                     class="bg-color-dark flex-column color-sub round-sm flex-5 pad-v-1">
                    <i :class="`ico-${item.icon} fsize-1d7 alpha-d5`"></i>
                    <span>{{item.text}}</span>
                </div>
            </b-grid>
            <p><b>common_plan</b> 字段一旦设置，会覆盖 <b>items</b> 内的局部栅格方案。</p>
            <p>【exp】：</p>
            <b-grid styles="resize bg-color-dgray round-sm pad-.5" v-bind="data_1_1">
                <div v-for="item of data_1_1.colData.items" :key="item.id" :slot="item.id"
                     class="bg-color-dark flex-column color-sub round-sm flex-5 pad-v-1">
                    <i :class="`ico-${item.icon} fsize-1d7 alpha-d5`"></i>
                    <span>{{item.text}}</span>
                </div>
            </b-grid>
            <hr>
            <p></p>
        </section>

        <!--栅格系统边框样式-->
        <section>
            <h5>栅格系统边框样式</h5>
            <p>通过 <code>gridHeight</code> 属性可限定元素高度，<code>line</code> 属性和 <code>outlineColor</code> 属性则可以分别设置栅格系统的内部边框颜色和外框样色。值得注意的是，外框样色通常选用背景色，可用以覆盖 "消除" 内部边框的 "溢出" 效果。</p>
            <p>【exp】：</p>
            <b-grid styles="resize round-md" v-bind="data_2">
                <div v-for="item of data_2.colData.items" :key="item.id" :slot="item.id"
                     class="flex-column round-sm flex-5 pad-v-1">
                    <i :class="`ico-${item.icon} fsize-1d7 alpha-d5`"></i>
                    <span>{{item.text}}</span>
                </div>
            </b-grid>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BGrid from "@/components/BTXUI/core/b-grid"

    export default {
        name: "b_grid_demo",
        components: {
            HeaderInfo,
            BGrid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BGrid.name,
                    ...BGrid.introduce,
                },

                data_1: {
                    colData: {
                        items: [
                            {
                                id: "a",
                                plan: "col-3 col-4-m col-6-s",
                                icon: "github",
                                text: "github"
                            },
                            {
                                id: "b",
                                plan: "col-3 col-4-m col-6-s",
                                icon: "download",
                                text: "download"
                            },
                            {
                                id: "c",
                                plan: "col-3 col-4-m col-6-s",
                                icon: "ui",
                                text: "ui"
                            },
                            {
                                id: "d",
                                plan: "col-3 col-4-m col-6-s",
                                icon: "home",
                                text: "home"
                            },
                            {
                                id: "e",
                                plan: "col-6 col-12-s",
                                icon: "list",
                                text: "list"
                            },
                            {
                                id: "f",
                                plan: "col-6 col-12-s",
                                icon: "data",
                                text: "data"
                            },
                            {
                                id: "g",
                                plan: "col-6 col-12-s",
                                icon: "user",
                                text: "user"
                            },
                            {
                                id: "h",
                                plan: "col-6 col-12-s",
                                icon: "system",
                                text: "system",
                            },
                        ],
                    },
                    gap: .5
                },
                data_1_1: {
                    colData: {
                        items: [
                            {
                                id: "a",
                                icon: "github",
                                text: "github"
                            },
                            {
                                id: "b",
                                icon: "download",
                                text: "download"
                            },
                            {
                                id: "c",
                                icon: "ui",
                                text: "ui"
                            },
                            {
                                id: "d",
                                icon: "home",
                                text: "home"
                            },
                            {
                                id: "e",
                                icon: "list",
                                text: "list"
                            },
                            {
                                id: "f",
                                icon: "data",
                                text: "data"
                            },
                            {
                                id: "g",
                                icon: "user",
                                text: "user"
                            },
                            {
                                id: "h",
                                icon: "system",
                                text: "system",
                            },
                        ],
                        common_plan: "col-3 col-4-m col-6-s"
                    },
                    gap: .5
                },

                data_2: {
                    colData: {
                        items: [
                            {
                                id: "a",
                                icon: "github",
                                text: "github"
                            },
                            {
                                id: "b",
                                icon: "download",
                                text: "download"
                            },
                            {
                                id: "c",
                                icon: "ui",
                                text: "ui"
                            },
                            {
                                id: "d",
                                icon: "home",
                                text: "home"
                            },
                            {
                                id: "e",
                                icon: "list",
                                text: "list"
                            },
                            {
                                id: "f",
                                icon: "data",
                                text: "data"
                            },
                            {
                                id: "g",
                                icon: "user",
                                text: "user"
                            },
                            {
                                id: "h",
                                icon: "system",
                                text: "system",
                            },
                        ],
                        common_plan: "col-3 col-4-m col-6-s"
                    },
                    gap: .4,
                    line: ["lgray", 4],
                    outlineColor: "light"
                },

            }
        }
    }
</script>