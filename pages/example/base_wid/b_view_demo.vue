<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 设置背景图 -->
        <section>
            <h5>设置背景图</h5>
            <p>通过 <code>bgImg</code> 属性可设置背景图，之后可通过背景图相关 class 属性进行其它样式化处理。</p>
            <p>【exp】：</p>
            <b-view class="flex">
                <b-view class="w-10 h-10 round-md mrg-r-9 bg-size-cover" bg-img="/img/head.jpg"></b-view>
                <b-view class="w-10 h-10 round-md bg-size-cover" bg-img="/img/head2.jpg"></b-view>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 多维变形 -->
        <section class="mrg-t-5">
            <h5>多维变形</h5>
            <p>通过 <code>matrix</code> 属性可设置容器变形。</p>
            <p>【exp】：</p>
            <b-view class="flex rel fsize-3">
                <b-view class="w-8 h-8 round-md bg-color-Cec433433 flex-5">A</b-view>
                <b-view class="w-8 h-8 round-md bg-color-Cfdba0033 flex-5 abs" :matrix="{translate: '120%,0', rotate: '45deg', scale: '.5'}">B</b-view>
                <b-view class="w-8 h-8 round-md bg-color-C02b9a133 flex-5 abs" :matrix="{translate: '240%,0', scale: '.8'}">C</b-view>
                <b-view class="w-8 h-8 round-md bg-color-C4085f333 flex-5 abs" :matrix="{translate: '360%,0', skew: '-20deg', scale: '.6'}">D</b-view>
            </b-view>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-view", 
        desc: ["该组件是用于布局的基础组件，相当于 html 中 div 的作用，可以接收 <code>class</code> 属性来应用框架样式体系。"],
        dependent: ["b-style"], 
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["bgImg", "string", "背景图地址"],
            ["matrix", "{translate: '位移', scale: '放缩', rotate: '旋转', skew: '斜切'}", "设置变形矩阵"]
        ] 
    }

    const $code = ref();
    const $code2 = ref();

    const exp1 = `
    <b-view class="flex">
        <b-view class="w-10 h-10 round-md mrg-r-9 bg-size-cover" bg-img="/img/head.jpg"></b-view>
        <b-view class="w-10 h-10 round-md bg-size-cover" bg-img="/img/head2.jpg"></b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="flex rel fsize-3">
        <b-view class="w-8 h-8 round-md bg-color-Cec433433 flex-5">A</b-view>
        <b-view class="w-8 h-8 round-md bg-color-Cfdba0033 flex-5 abs" :matrix="{translate: '120%,0', rotate: '45deg', scale: '.5'}">B</b-view>
        <b-view class="w-8 h-8 round-md bg-color-C02b9a133 flex-5 abs" :matrix="{translate: '240%,0', scale: '.8'}">C</b-view>
        <b-view class="w-8 h-8 round-md bg-color-C4085f333 flex-5 abs" :matrix="{translate: '360%,0', skew: '-20deg', scale: '.6'}">D</b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
    })
</script>