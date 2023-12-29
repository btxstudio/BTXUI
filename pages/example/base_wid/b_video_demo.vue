<template>
    <article>
        <header-info v-bind="introduce" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>video</code> 属性绑定视频资源即可显示。<code>autoPlay</code> 开启可设置自动播放，但会保持静音状态。<code>loop</code> 开启可设置循环播放。</p>
            <b-view>
                <b-video video="https://cdn.modao.cc/video/cf/0715/new_design.mp4" :auto-play="true" :loop="true" class="round-md" />
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
        name: "b-video", 
        desc: ["该组件用于实现视频播放器。"],
        dependent: ["b-style"], 
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["video", "string", "视频资源"],
            ["autoPlay", "boolean", "自动播放"],
            ["loop", "boolean", "循环播放"]
        ] 
    }

    const $code = ref();

    const exp1 = `
    <b-view>
        <b-video video="https://cdn.modao.cc/video/cf/0715/new_design.mp4" :auto-play="true" :loop="true" class="round-md" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>