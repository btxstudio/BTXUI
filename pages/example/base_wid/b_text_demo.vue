<template>
    <article>
        <header-info v-bind="introduce" />

        <!--标记文本样式-->
        <section>
            <h5>标记文本样式</h5>
            <p>【exp】：</p>
            <b-view>
                <b-view>If you were a teardrop;<b-text class="bg-color-blue color-light">In my eye,For fear of losing you,I would never cry.</b-text>And if the golden sun,Should cease to shine its light,<b-text class="bold">Just one smile from you,Would make my whole world bright.</b-text></b-view>
                <b-view class="mrg-t-1">如果你是我眼里的一滴泪，<b-text class="color-blue">为了不失去你，我将永不哭泣；</b-text>如果金色的阳光停止了它耀眼的光芒，<b-text class="color-sub">你的一个微笑，将照亮我的整个世界。</b-text></b-view>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-text", 
        desc: ["该组件用于标记富文本片段，相当于 html 中 span 的作用，可以接收 <code>class</code> 属性来应用框架样式体系。"],
        dependent: ["b-style"], 
        initData: [
            ["class", "string", "参照：b-style 组件入参"]
        ] 
    }

    const $code = ref();

    const exp1 = `
    <b-view>
        <b-view>If you were a teardrop;<b-text class="bg-color-blue color-light">In my eye,For fear of losing you,I would never cry.</b-text>And if the golden sun,Should cease to shine its light,<b-text class="bold">Just one smile from you,Would make my whole world bright.</b-text></b-view>
        <b-view class="mrg-t-1">如果你是我眼里的一滴泪，<b-text class="color-blue">为了不失去你，我将永不哭泣；</b-text>如果金色的阳光停止了它耀眼的光芒，<b-text class="color-sub">你的一个微笑，将照亮我的整个世界。</b-text></b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>