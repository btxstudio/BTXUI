<template>
    <article>
        <header-info v-bind="introduce" />
        <section>
            <h5>基础使用</h5>
            <p>【exp】：</p>
            <b-view>
                <b-webview src="https://socialfrontier.com/" class="max-w round-md h-70" />
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
        name: "b-webview", 
        desc: ["该组件用于内嵌网页。"],
        dependent: ["b-style"], 
        initData: [
            ["src", "string", "内嵌网页地址"],
            ["class", "string", "参照：b-style 组件入参"]
        ] 
    }

    const $code = ref();

    const exp1 = `
    <b-view>
        <b-webview src="https://socialfrontier.com/" class="max-w round-md h-70" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>