<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础栅格布局 -->
        <section>
            <h5>基础栅格布局</h5>
            <p>通过 <code>b-row</code> 组件可设置栅格布局容器（即栅格行）；<code>b-col</code> 组件可设置栅格布局项目（即栅格列）。通过 <code>.col-*</code> class 属性或直接使用 <code>span</code> 属性，可设置项目的栅格比，数字区间为 [1-12]。</p>
            <p>【exp】：</p>
            <b-row>
                <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
                <b-col :span="3" class="h-3 bg-color-Cddd flex-5">col-3</b-col>
                <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
                <b-col :span="3" class="h-3 bg-color-Cddd flex-5">col-3</b-col>
                <b-col :span="4" class="h-3 bg-color-C777 flex-5">col-4</b-col>
                <b-col :span="4" class="h-3 bg-color-mgray flex-5">col-4</b-col>
                <b-col :span="4" class="h-3 bg-color-C777 flex-5">col-4</b-col>
                <b-col :span="6" class="h-3 bg-color-lgray flex-5">col-6</b-col>
                <b-col :span="6" class="h-3 bg-color-Cddd flex-5">col-6</b-col>
                <b-col :span="12" class="h-3 bg-color-mgray flex-5">col-12</b-col>
            </b-row>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 对齐方式 -->
        <section class="mrg-t-5">
            <h5>对齐方式</h5>
            <p>通过相关 class 属性即可设置对齐方式。包括：<code>.flex-*</code> 实现九宫格布局；<code>.flex-between</code>、<code>.flex-around</code> 实现项目主轴分布。</p>
            <p>【exp】：</p>
            <b-view>项目右对齐</b-view>
            <b-row class="flex-3 mrg-b-1 bg-color-Cf9f9f9 pad-d5 round-sm">
                <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
                <b-col :span="3" class="h-5 bg-color-Cddd flex-5">col-3</b-col>
                <b-col :span="3" class="h-4 bg-color-lgray flex-5">col-3</b-col>
            </b-row>
            <b-view>项目居中对齐</b-view>
            <b-row class="flex-2 mrg-b-1 bg-color-Cf9f9f9 pad-d5 round-sm">
                <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
                <b-col :span="3" class="h-5 bg-color-Cddd flex-5">col-3</b-col>
                <b-col :span="3" class="h-4 bg-color-lgray flex-5">col-3</b-col>
            </b-row>
            <b-view>项目环绕分布</b-view>
            <b-row class="flex-around bg-color-Cf9f9f9 pad-d5 round-sm">
                <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
                <b-col :span="3" class="h-5 bg-color-Cddd flex-5">col-3</b-col>
                <b-col :span="3" class="h-4 bg-color-lgray flex-5">col-3</b-col>
            </b-row>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 排序 -->
        <section class="mrg-t-5">
            <h5>排序</h5>
            <p>通过 <code>.order-*</code> class 属性可设置项目排序。</p>
            <p>【exp】：</p>
            <b-row>
                <b-col :span="3" class="order-4 h-3 bg-color-lgray flex-5">1 col-3</b-col>
                <b-col :span="3" class="order-3 h-3 bg-color-Cddd flex-5">2 col-3</b-col>
                <b-col :span="3" class="order-2 h-3 bg-color-lgray flex-5">3 col-3</b-col>
                <b-col :span="3" class="order-1 h-3 bg-color-Cddd flex-5">4 col-3</b-col>
            </b-row>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>

        <!-- 自适应填充及百分比适配 -->
        <section class="mrg-t-5">
            <h5>自适应填充</h5>
            <p>通过 <code>.grow-*</code> class 属性可设置项目自适应填充，此时无需再设置 <code>.span</code> 属性。</p>
            <p>【exp】：</p>
            <b-row>
                <b-col :span="6" class="h-3 bg-color-lgray flex-5">col-6</b-col>
                <b-col class="grow-1 h-3 bg-color-Cddd flex-5">grow-1</b-col>
                <b-col class="grow-2 h-3 bg-color-lgray flex-5">grow-2</b-col>
                <b-col class="w-25-P h-3 bg-color-Cddd flex-5">25%</b-col>
            </b-row>
            <pre ref="$code4" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp4"></pre>
        </section>

        <!-- 水平偏移 -->
        <section class="mrg-t-5">
            <h5>水平偏移</h5>
            <p>通过 <code>.offset-*</code> class 属性或直接使用 <code>offset</code> 属性，可设置项目的水平偏移比，数字区间为 [1-12]。</p>
            <p>【exp】：</p>
            <b-row>
                <b-col :span="6" :offset="6" class="h-3 bg-color-lgray flex-5">col-6</b-col>
                <b-col :span="4" class="h-3 bg-color-C777 flex-5">col-4</b-col>
                <b-col :span="4" :offset="4" class="h-3 bg-color-mgray flex-5">col-4</b-col>
                <b-col :span="3" class="h-3 bg-color-Cddd flex-5">col-3</b-col>
                <b-col :span="3" :offset="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
                <b-col :span="3" class="h-3 bg-color-Cddd flex-5">col-3</b-col>
            </b-row>
            <pre ref="$code5" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp5"></pre>
        </section>

        <!-- 区块间隔 -->
        <section class="mrg-t-5">
            <h5>区块间隔</h5>
            <p>通过 <code>gap</code> 属性，可设置项目的水平和垂直方向间隔；也可通过数组形式分别对其进行两个方向的间隔设置。</p>
            <p>【exp】：</p>
            <b-view class="flex">
                <b-row class="grow-1 pad-r-2" :gap="1">
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                </b-row>
                <b-row class="grow-1 pad-l-2" :gap="[1, 2]">
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                    <b-col :span="4">
                        <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
                    </b-col>
                </b-row>
            </b-view>
            <pre ref="$code6" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp6"></pre>
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
        desc: ["该组件可用于实现响应式栅格布局。由 <code>b-row</code> 和 <code>b-col</code> 两种组件进行组合式使用，分别充当容器和项目。"],
        dependent: ["b-view"], 
        initData: [
            ["class", "string", "参照：b-style 组件入参。可分别应用于两种组件"],
            ["viewData", "ViewData", "参照：b-view 组件入参。可分别应用于两种组件"],
            ["gap", "number | [number, number]", "元素间距，默认同时设置水平及垂直方向，数组形式可分别设置。应用于 b-row 组件"],
            ["span", "number", "栅格比，数字区间为 [1-12]。应用于 b-col 组件"],
            ["offset", "number", "栅格偏移比，数字区间为 [1-12]。应用于 b-col 组件"],
        ] 
    }

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();
    const $code4 = ref();
    const $code5 = ref();
    const $code6 = ref();

    const exp1 = `
    <b-row>
        <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
        <b-col :span="3" class="h-3 bg-color-Cddd flex-5">col-3</b-col>
        <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
        <b-col :span="3" class="h-3 bg-color-Cddd flex-5">col-3</b-col>
        <b-col :span="4" class="h-3 bg-color-C777 flex-5">col-4</b-col>
        <b-col :span="4" class="h-3 bg-color-mgray flex-5">col-4</b-col>
        <b-col :span="4" class="h-3 bg-color-C777 flex-5">col-4</b-col>
        <b-col :span="6" class="h-3 bg-color-lgray flex-5">col-6</b-col>
        <b-col :span="6" class="h-3 bg-color-Cddd flex-5">col-6</b-col>
        <b-col :span="12" class="h-3 bg-color-mgray flex-5">col-12</b-col>
    </b-row>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view>项目右对齐</b-view>
    <b-row class="flex-3 mrg-b-1 bg-color-Cf9f9f9 pad-d5 round-sm">
        <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
        <b-col :span="3" class="h-5 bg-color-Cddd flex-5">col-3</b-col>
        <b-col :span="3" class="h-4 bg-color-lgray flex-5">col-3</b-col>
    </b-row>
    <b-view>项目居中对齐</b-view>
    <b-row class="flex-2 mrg-b-1 bg-color-Cf9f9f9 pad-d5 round-sm">
        <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
        <b-col :span="3" class="h-5 bg-color-Cddd flex-5">col-3</b-col>
        <b-col :span="3" class="h-4 bg-color-lgray flex-5">col-3</b-col>
    </b-row>
    <b-view>项目环绕分布</b-view>
    <b-row class="flex-around bg-color-Cf9f9f9 pad-d5 round-sm">
        <b-col :span="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
        <b-col :span="3" class="h-5 bg-color-Cddd flex-5">col-3</b-col>
        <b-col :span="3" class="h-4 bg-color-lgray flex-5">col-3</b-col>
    </b-row>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-row>
        <b-col :span="3" class="order-4 h-3 bg-color-lgray flex-5">1 col-3</b-col>
        <b-col :span="3" class="order-3 h-3 bg-color-Cddd flex-5">2 col-3</b-col>
        <b-col :span="3" class="order-2 h-3 bg-color-lgray flex-5">3 col-3</b-col>
        <b-col :span="3" class="order-1 h-3 bg-color-Cddd flex-5">4 col-3</b-col>
    </b-row>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp4 = `
    <b-row>
        <b-col :span="6" class="h-3 bg-color-lgray flex-5">col-6</b-col>
        <b-col class="grow-1 h-3 bg-color-Cddd flex-5">grow-1</b-col>
        <b-col class="grow-2 h-3 bg-color-lgray flex-5">grow-2</b-col>
        <b-col class="w-25-P h-3 bg-color-Cddd flex-5">25%</b-col>
    </b-row>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp5 = `
    <b-row>
        <b-col :span="6" :offset="6" class="h-3 bg-color-lgray flex-5">col-6</b-col>
        <b-col :span="4" class="h-3 bg-color-C777 flex-5">col-4</b-col>
        <b-col :span="4" :offset="4" class="h-3 bg-color-mgray flex-5">col-4</b-col>
        <b-col :span="3" class="h-3 bg-color-Cddd flex-5">col-3</b-col>
        <b-col :span="3" :offset="3" class="h-3 bg-color-lgray flex-5">col-3</b-col>
        <b-col :span="3" class="h-3 bg-color-Cddd flex-5">col-3</b-col>
    </b-row>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp6 = `
    <b-view class="flex">
        <b-row class="grow-1 pad-r-2" :gap="1">
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
        </b-row>
        <b-row class="grow-1 pad-l-2" :gap="[1, 2]">
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
            <b-col :span="4">
                <b-view class="h-3 bg-color-lgray flex-5">col-4</b-view>
            </b-col>
        </b-row>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
        hljs.highlightElement($code4.value);
        hljs.highlightElement($code5.value);
        hljs.highlightElement($code6.value);
    })
</script>