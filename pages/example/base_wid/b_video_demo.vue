<template>
    <article>
        <header-info v-bind="introduce" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>video</code> 属性绑定视频资源即可显示，默认点击会直接播放。若设置<code>full-screen</code> 属性，则会执行全屏播放。</p>
            <b-view class="flex">
                <b-view class="pad-d5 bg-color-neutral round-md mrg-r-1">
                    <b-video video="https://cdn.modao.cc/video/cf/0715/new_design.mp4" 
                        poster="/img/poster.png"
                        class="round-sm max-w rw-320-px" />
                    <b-view class="pcenter pad-v-d4">嵌入式播放</b-view>
                </b-view>
                <b-view class="pad-d5 bg-color-neutral round-md">
                    <b-video video="https://cdn.modao.cc/video/cf/0715/new_design.mp4" 
                        :full-screen="true"
                        poster="/img/poster.png" 
                        class="round-md max-w rw-320-px" />
                    <b-view class="pcenter pad-v-d4">全屏播放</b-view>
                </b-view>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!--自动播放-->
        <section class="mrg-t-5">
            <h5>自动播放</h5>
            <p>通过 <code>autoPlay</code> 可设置自动播放，但会保持静音状态。<code>loop</code> 开启可设置循环播放。</p>
            <b-view>
                <b-video video="https://cdn.modao.cc/video/cf/0715/new_design.mp4" 
                    :auto-play="true" 
                    :loop="true" 
                    poster="/img/poster.png" 
                    class="round-md max-w rw-640-px" />
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
        name: "b-video", 
        desc: ["该组件用于实现视频播放器。"],
        dependent: ["b-style"], 
        api: {
            event: [
                {
                    name: "on_play",
                    ef: "视频播放",
                    params: "-",
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["video", "string", "视频资源"],
            ["autoPlay", "boolean", "自动播放（移动端有兼容性问题）"],
            ["loop", "boolean", "循环播放"],
            ["cname", "string", "元素别名，用于类名合成唯一化"],
            ["fullScreen", "boolean", "移动端是否全屏播放，默认 false"],
            ["poster", "string", "视频封面"],
            ["customControls", "boolean", "自定义控制器，默认 false"],
        ] 
    }

    const $code = ref();
    const $code2 = ref();

    const exp1 = `
    <b-view class="flex">
        <b-view class="pad-d5 bg-color-neutral round-md mrg-r-1">
            <b-video video="https://cdn.modao.cc/video/cf/0715/new_design.mp4" 
                poster="/img/poster.png"
                class="round-sm max-w rw-320-px" />
            <b-view class="pcenter pad-v-d4">嵌入式播放</b-view>
        </b-view>
        <b-view class="pad-d5 bg-color-neutral round-md">
            <b-video video="https://cdn.modao.cc/video/cf/0715/new_design.mp4" 
                :full-screen="true"
                poster="/img/poster.png" 
                class="round-md max-w rw-320-px" />
            <b-view class="pcenter pad-v-d4">全屏播放</b-view>
        </b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view>
        <b-video video="https://cdn.modao.cc/video/cf/0715/new_design.mp4" 
            :auto-play="true" 
            :loop="true" 
            poster="/img/poster.png" 
            class="round-md max-w rw-640-px" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
    })
</script>