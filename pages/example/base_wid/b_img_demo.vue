<template>
    <article>
        <header-info v-bind="introduce" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>img</code> 属性绑定图像资源即可显示。</p>
            <p>【exp】：</p>
            <b-view>
                <b-img img="/img/head.jpg" class="round-md w-12" alt="图片基础展示" />
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!--缺省图使用-->
        <section class="mrg-t-5">
            <h5>缺省图使用</h5>
            <p>通过 <code>defaultSrc</code> 属性可以设置图像的缺省显示资源。当同时设置 <code>img</code> 属性时，在其加载完成前，或是加载失败后，都会保持缺省图的显示。</p>
            <p>【exp】：</p>
            <b-view class="flex">
                <b-img img="/img/head.jpg" default-src="/img/default.jpg" class="round-md w-12 mrg-r-2" />
                <b-img img="/img/xxx.jpg" default-src="/img/default.jpg" class="round-md w-12" />
            </b-view>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!--样式使用-->
        <section class="mrg-t-5">
            <h5>样式使用</h5>
            <p>通过 <code>class</code> 属性可以应用框架样式体系。其中 <code>objFit</code> 属性用以设置 object-fit 样式。</p>
            <b-view class="flex wrap pcenter">
                <b-view class="mrg-r-2">
                    <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-fill" />
                    <b-text>fill（默认值）</b-text>
                </b-view>
                <b-view class="mrg-r-2">
                    <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-cover" />
                    <b-text>cover</b-text>
                </b-view>
                <b-view class="mrg-r-2">
                    <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-contain" />
                    <b-text>contain</b-text>
                </b-view>
                <b-view class="mrg-r-2">
                    <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-none" />
                    <b-text>none</b-text>
                </b-view>
                <b-view>
                    <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-scaledown" />
                    <b-text>scale-down</b-text>
                </b-view>
            </b-view>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-img", 
        desc: ["该组件用于实现图片显示。"],
        dependent: ["b-style"], 
        api: {
            event: [
                {
                    name: "on_load",
                    ef: "图片加载完成",
                    params: "-",
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["img", "string", "图像资源"],
            ["defaultSrc", "string", "默认图，加载失败或初始加载时显示"],
            ["matrix", "{translate: '位移', scale: '放缩', rotate: '旋转', skew: '斜切'}", "设置变形矩阵"],
            ["alt", "string", "图片说明提示"]
        ] 
    }

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();

    const cover = ref('');

    const exp1 = `
    <b-view>
        <b-img img="/img/head.jpg" class="round-md w-12" alt="图片基础展示" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    const exp2 = `
    <b-view class="flex">
        <b-img img="/img/head.jpg" default-src="/img/default.jpg" class="round-md w-12 mrg-r-2" />
        <b-img img="/img/xxx.jpg" default-src="/img/default.jpg" class="round-md w-12" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view class="flex wrap pcenter">
        <b-view class="mrg-r-2">
            <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-fill" />
            <b-text>fill（默认值）</b-text>
        </b-view>
        <b-view class="mrg-r-2">
            <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-cover" />
            <b-text>cover</b-text>
        </b-view>
        <b-view class="mrg-r-2">
            <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-contain" />
            <b-text>contain</b-text>
        </b-view>
        <b-view class="mrg-r-2">
            <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-none" />
            <b-text>none</b-text>
        </b-view>
        <b-view>
            <b-img img="/img/head2.jpg" class="round-md w-12 h-6 bg-color-mgray objfit-scaledown" />
            <b-text>scale-down</b-text>
        </b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);

        setTimeout(() => {
            cover.value = '/img/head2.jpg';
        }, 2000)
    })
</script>