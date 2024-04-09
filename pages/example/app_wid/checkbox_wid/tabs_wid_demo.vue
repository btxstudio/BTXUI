<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础使用 -->
        <section>
            <h5>基础使用</h5>
            <p>直接通过 <code>options</code> 属性可设标签及对应内容，<code>v-model:selected</code> 属性则用于设置所选标签项。</p>
            <tabs-wid :options="data_1.options" v-model:selected="data_1.selected" />
            <p>当前所选标签：<code>{{data_1.selected}}</code></p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 网格风格及自定义配色 -->
        <section class="mrg-t-5">
            <h5>网格风格及自定义配色</h5>
            <p>通过设置 <code>tabStyle</code> 属性为 "grid"，可设置标签网格样式效果。<code>color</code> 字段可以设置基础配色。</p>
            <tabs-wid :options="data_2.options" color="green" tabStyle="grid" v-model:selected="data_2.selected" />
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 选项卡风格 -->
        <section class="mrg-t-5">
            <h5>选项卡风格</h5>
            <p>通过设置 <code>tabStyle</code> 属性为 "tab"，可设置标签选项卡样式效果。使用 <code>noDataNotic</code> 属性则可设置缺省内容提示。</p>
            <tabs-wid :options="data_2.options" tabStyle="card" v-model:selected="data_2.selected" no-data-notic="暂未选择任何“大佬”！" />
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>

        <!-- 滑动切换 -->
        <section class="mrg-t-5">
            <h5>滑动切换</h5>
            <p>通过 <code>smooth</code> 属性可以设置内容滑动切换效果。</p>
            <tabs-wid :options="data_2.options" :smooth="true" v-model:selected="data_2.selected" />
            <pre ref="$code4" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp4"></pre>
        </section>

        <!-- 自定义风格 -->
        <section class="mrg-t-5">
            <h5>自定义风格</h5>
            <p>通过设置 <code>options</code> 的 <code>checkboxData</code> 属性，可定制化设置标签效果。配合具名插槽，更可以自由添加标签前置图标等元素，具名插槽命名基于 options 选项的 <code>value</code> 属性。</p>
            <p>通过 <code>change</code> 事件 API，可以获取标签切换相关数据。包括：前一标签值、当前标签值、切换方向（0：从左往右, 1：从右往左）、动画类，可用于外部元素切换控制。</p>
            <b-view class="flex-4">
                <b-view class="w-7 over-hide mrg-r-2 round">
                    <b-view :bg-img="`/img/${data_3.selected}.jpg`" class="round w-7 h-7 bsize-cover"
                        @on_aniEnd="data_3.flipDir = '-1'"
                        :state="data_3.flipDir"
                        :states="{
                            0: {ani: 'ani-left-to-right'},
                            1: {ani: 'ani-right-to-left'},
                        }" />
                </b-view>
                <tabs-wid :options="data_3.options" v-model:selected="data_3.selected" @change="data_3.change">
                    <template #head><b-icon icon="/img/flag.jpg" class="h-2 w-2 bsize-cover round mrg-r-d5" /></template>
                    <template #head2><b-icon icon="/img/flag2.jpg" class="h-2 w-2 bsize-cover round mrg-r-d5" /></template>
                    <template #head3><b-icon icon="/img/flag3.jpg" class="h-2 w-2 bsize-cover round mrg-r-d5" /></template>
                </tabs-wid>
            </b-view>
            <pre ref="$code5" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp5"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, onMounted, reactive } from "vue";
    import headerInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";

    const introduce: HeaderInfoData = {
        name: "tabs-wid",
        desc: ["该组件用于实现标签组切换交互。"],
        dependent: ["radio-group-wid", "b-view"], 
        api: {
            event: [
                {
                    name: "change",
                    ef: "选中值变化",
                    params: "{cur: string, old: string, dir: 0 | 1, aniClass: string}"
                }
            ]
        },
        initData: [
            ["options", "[*]", "选项集合"],
            ["options[*].label", "string", "选项标签"],
            ["options[*].value", "string", "选项值"],
            ["options[*]?.cont", "string", "选项内容"],
            ["options[*].checkboxData", "CheckboxData", "参照：checkbox-wid 组件入参"],
            ["v-model:selected", "string", "选中值"],
            ["title", "string", "标签组标题"],
            ["color", "string", "主题色"],
            ["tabStyle", "'grid' | 'card'", "标签风格"],
            ["smooth", "boolean", "内容滑动切换效果，默认关闭"],
            ["noDataNotic", "string", "无数据提示"],
        ] 
    };

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();
    const $code4 = ref();
    const $code5 = ref();

    const data_1 = reactive({
        options: [
            {
                value: "html",
                label: "html",
                cont: "html 是用于网页布局的标记语言"
            },
            {
                value: "css",
                label: "css",
                cont: "css 是用于网页样式的语言"
            },
            {
                value: "javascript",
                label: "javascript",
                cont: "javascript 是用于网页交互行为的脚本语言"
            },
        ],
        selected: "html",
    });
    const data_2 = reactive({
        options: [
            {
                value: "qbs",
                label: "乔布斯",
                cont: "<b style='color: #2d7e74'>史蒂夫·乔布斯</b><b>（Steve Jobs）</b>，1955年2月24日—2011年10月5日，美国发明家、企业家，苹果公司联合创始人，曾任苹果公司首席执行官。"
            },
            {
                value: "msk",
                label: "马斯克",
                cont: "<b style='color: #2d7e74'>埃隆·里夫·马斯克</b><b>（Elon Reeve Musk）</b>，1971年6月28日出生于南非行政首都比勒陀利亚，Tesla创始人兼首席执行官。"
            },
            {
                value: "atm",
                label: "奥特曼",
                cont: "<b style='color: #2d7e74'>山姆·奥特曼</b><b>（Sam Altman）</b>，男，1985年4月22日出生于美国伊利诺伊州的芝加哥。现任人工智能实验室OpenAI首席执行官。"
            },
        ],
        selected: "",
    });
    const data_3 = reactive({
        options: [
            {
                value: "head",
                label: "日本",
                checkboxData: {
                    class: 'bg-color-neutral round-lg mrg-r-1 pad-r-1d5 flex-4 pad-4-px',
                    actClass: 'bg-color-blue color-light',
                }
            },
            {
                value: "head2",
                label: "南非",
                checkboxData: {
                    class: 'bg-color-neutral round-lg mrg-r-1 pad-r-1d5 flex-4 pad-4-px',
                    actClass: 'bg-color-green color-light',
                }
            },
            {
                value: "head3",
                label: "中国",
                checkboxData: {
                    class: 'bg-color-neutral round-lg pad-r-1d5 flex-4 pad-4-px',
                    actClass: 'bg-color-red color-light',
                }
            },
        ],
        selected: "head",
        flipDir: "",
        change: (flip: { dir: string; }) => {
            data_3.flipDir = flip.dir;
        }
    });

    const exp1 = `
    <tabs-wid :options="data_1.options" v-model:selected="data_1.selected" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <tabs-wid :options="data_2.options" color="green" tabStyle="grid" v-model:selected="data_2.selected" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <tabs-wid :options="data_2.options" tabStyle="card" v-model:selected="data_2.selected" no-data-notic="暂未选择任何“大佬”！" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp4 = `
    <tabs-wid :options="data_2.options" :smooth="true" v-model:selected="data_2.selected" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp5 = `
    <b-view class="flex-4">
        <b-view class="w-7 over-hide mrg-r-2 round">
            <b-view :bg-img="'/img/' + data_3.selected + '.jpg'" class="round w-7 h-7 bsize-cover"
                @on_aniEnd="data_3.flipDir = '-1'"
                :state="data_3.flipDir"
                :states="{
                    0: {ani: 'ani-left-to-right'},
                    1: {ani: 'ani-right-to-left'},
                }" />
        </b-view>
        <tabs-wid :options="data_3.options" v-model:selected="data_3.selected" @change="data_3.change">
            <template #head><b-icon icon="/img/flag.jpg" class="h-2 w-2 bsize-cover round mrg-r-d5" /></template>
            <template #head2><b-icon icon="/img/flag2.jpg" class="h-2 w-2 bsize-cover round mrg-r-d5" /></template>
            <template #head3><b-icon icon="/img/flag3.jpg" class="h-2 w-2 bsize-cover round mrg-r-d5" /></template>
        </tabs-wid>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
        hljs.highlightElement($code4.value);
        hljs.highlightElement($code5.value);
    })
</script>