<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 响应式栅格布局 -->
        <section>
            <h5>响应式栅格布局</h5>
            <p>通过 <code>colData</code> 属性可设置栅格布局，包括均分和非均分 2 种形式，<b>items</b> 字段用于对每个项目进行栅格设置；<b>common_plan</b> 字段则用于对所有项目进行统一栅格设置。设置值可参考全局样式的栅格系统，且支持响应式分段。</p>
            <p>通过 <code>gap</code> 属性可设置栅格元素的内边距，默认单位 rem。</p>
            <p>【exp】：</p>
            <!-- <b-grid class="resize bg-color-dgray round-sm pad-.5" v-bind="data_1">
                <div v-for="item of data_1.colData.items" :key="item.id" :slot="item.id"
                     class="bg-color-dark flex-column color-sub round-sm flex-5 pad-v-1">
                    <i :class="`ico-${item.icon} fsize-1d7 alpha-d5`"></i>
                    <span>{{item.text}}</span>
                </div>
            </b-grid> -->
            <p><b>common_plan</b> 字段一旦设置，会覆盖 <b>items</b> 内的局部栅格方案。</p>
            <p>【exp】：</p>
            <!-- <b-grid styles="resize bg-color-dgray round-sm pad-.5" v-bind="data_1_1">
                <div v-for="item of data_1_1.colData.items" :key="item.id" :slot="item.id"
                     class="bg-color-dark flex-column color-sub round-sm flex-5 pad-v-1">
                    <i :class="`ico-${item.icon} fsize-1d7 alpha-d5`"></i>
                    <span>{{item.text}}</span>
                </div>
            </b-grid> -->
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 栅格系统边框样式 -->
        <section class="mrg-t-5">
            <h5>栅格系统边框样式</h5>
            <p>通过 <code>gridHeight</code> 属性可限定元素高度，<code>line</code> 属性和 <code>outlineColor</code> 属性则可以分别设置栅格系统的内部边框颜色和外框样色。值得注意的是，外框样色通常选用背景色，可用以覆盖 "消除" 内部边框的 "溢出" 效果。</p>
            <p>【exp】：</p>
            <!-- <b-grid styles="resize round-md" v-bind="data_2">
                <div v-for="item of data_2.colData.items" :key="item.id" :slot="item.id"
                     class="flex-column round-sm flex-5 pad-v-1">
                    <i :class="`ico-${item.icon} fsize-1d7 alpha-d5`"></i>
                    <span>{{item.text}}</span>
                </div>
            </b-grid> -->
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-grid", 
        desc: ["该组件可用于实现响应式栅格布局。"],
        dependent: ["b-style"], 
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["colData.items[*].Id", "string", "单元格 id"],
            ["colData.items[*].plan", "number", "局部栅格方案，可参考栅格系统全局样式 .col-*"],
            ["colData.common_plan", "number", "公共栅格方案，可参考栅格系统全局样式 .col-*"],
            ["gridHeight", "number", "栅格固定高度"],
            ["gap", "number", "栅格内边距，默认为 0"],
            ["line", "string", "手机拨号 (format: tel:xxx)"],
            ["outlineColor", "string", "容器描边色"]
        ] 
    }

    const $code = ref();

    const data_1 = {
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
    };
    const data_1_1 = {
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
    };
    const data_2 = {
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
    };

    const exp1 = `
    <b-view>
        <b-hot class="flex-5 h-3 w-10 bg-color-blue color-light round-sm" 
            hover="bg-color-C2274f7" 
            active="bg-color-C0055dd" 
            @on_click="data_1++">按钮</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>