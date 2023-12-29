<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础使用 -->
        <section>
            <h5>基础使用</h5>
            <p>长内容通常使用该组件进行包装，通过 <code>scroll</code> 属性可以设置溢出滚动及隐藏效果。<code>scrollType</code> 属性则可以设置滚动条样式，框架分别提供了 thin（极窄，默认）、thick（加宽） 两种类型。</p>
            <b-view class="color-mgray flex fsize-1d1 rw-70">
                <b-list class="grow-1 h-12 bg-color-lgray round-sm bg-color-dgray mrg-r-1 pad-1"
                    :scroll="{x: 'hidden', y: 'hidden'}">
                    <div class="pad-1">
                        <h5>溢出隐藏</h5>
                        <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                        <div class="pright alpha-d5">—— btxstudio</div>
                    </div>
                </b-list>
                <b-list class="grow-1 h-12 bg-color-lgray round-sm bg-color-dgray pad-1"
                    :scroll="{x: 'hidden', y: 'auto'}">
                    <div class="pad-1">
                        <h5>溢出滚动</h5>
                        <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                        <div class="pright alpha-d5">—— btxstudio</div>
                    </div>
                </b-list>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 横向滚动条 -->
        <section class="mrg-t-5">
            <h5>横向滚动条</h5>
            <p><code>scroll.x</code> 属性设置为 scroll，可以实现内容的水平溢出滚动。此外。通过 <code>on_scroll</code> API 可以监控滚动方向以及滚动距离。</p>
            <b-view class="fsize-1d1 rw-70">
                <b-list class="grow-1 h-12 bg-color-lgray round-sm bg-color-dgray pad-t-2 pad-b-1 pad-h-2"
                    :scroll="{x: 'scroll', y: 'hidden'}" 
                    scrollType="thick"
                    @on_scroll="setScrollDir">
                    <h5 class="color-mgray">横向滚动条</h5>
                    <div class="flex pad-b-1d5 color-light">
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">html</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">css</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">javascript</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">vue</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">react</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">typescript</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">C++</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">php</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">python</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">ruby</span>
                        <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2">linux</span>
                    </div>
                </b-list>
            </b-view>
            <p>
                滚动方向：
                <code v-if="scrollDir">{{ scrollDir }}</code>
                <span v-else class="alpha-d7">暂无滚动</span>
            </p>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 滚动置顶、置底监听 -->
        <section class="mrg-t-5">
            <h5>滚动置顶、置底监听</h5>
            <p>滚动过程中，通过 <code>on_scroll</code> API 可以监听滚动方向及定位；<code>on_to_top</code>、<code>on_to_bottom</code> 可以监听滚动条滚动置顶及置底状态。</p>
            <b-view class="fsize-1d1 rw-70 color-mgray">
                <b-list class="grow-1 h-15 bg-color-lgray round-sm bg-color-dgray pad-1"
                    :scroll="{x: 'hidden', y: 'scroll'}" 
                    @on_to_top="scrollState = '滚动置顶'"
                    @on_to_bottom="scrollState = '滚动置底'"
                    @on_scroll="setScrollDir_2">
                    <div class="bg-color-dgray pad-1">
                        <h5>滚动监听</h5>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p class="pright alpha-d5">—— btxstudio</p>
                    </div>
                </b-list>
            </b-view>
            <p>
                滚动方向及定位：
                <span v-if="scrollDir_2">
                    <span v-html="scrollDir_2"></span>
                    <span class="color-mgray pad-l-1">{{ scrollState }}</span>
                </span>
                <span v-else class="alpha-d7">暂无滚动</span>
            </p>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>
    </article>
</template>
<script setup lang="ts">
    import { ref } from "vue"
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-list", 
        desc: ["该组件用于实现长内容的溢出滚动及隐藏效果，此外还具备滚动条定位监听及懒加载接口。"],
        dependent: ["b-style"], 
        api: {
            methods: [
                {
                    name: "reset",
                    ef: "重置定位",
                    params: "-",
                    return: "-"
                }
            ],
            event: [
                {
                    name: "on_to_top",
                    ef: "滚动置顶",
                    params: "event"
                },
                {
                    name: "on_to_bottom",
                    ef: "滚动置底",
                    params: "event"
                },
                {
                    name: "on_scroll",
                    ef: "滚动",
                    params: "{dir:scrollDirection, left:scrollLeft, top:scrollTop}"
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["scroll.y", '"auto" | "hidden" | "scroll"', "垂直溢出行为"],
            ["scroll.x", '"auto" | "hidden" | "scroll"', "水平溢出行为"],
            ["scrollType", '"thick" | "thin"', "滚动条样式"]
        ] 
    }

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();

    const scrollDir = ref("");
    const scrollDir_2 = ref("");
    const scrollState = ref("");

    const setScrollDir = (scroll: any) => {
        let result: any;
        switch(scroll.dir){
            case "l2r": result = "从左向右滑动";
                break;
            case "r2l": result = "从右向左滑动";
        }
        scrollDir.value = result;
    };
    const setScrollDir_2 = (scroll: any) => {
        let result: any;
        switch(scroll.dir){
            case "t2b": result = `由上往下滑动，距离顶部：<code>${scroll.top} px</code>`;
                break;
            case "b2t": result = `由下往上滑动，距离顶部：<code>${scroll.top} px</code>`;
        }
        scrollState.value = "";
        scrollDir_2.value = result;
    };

    const exp1 = `
    <b-view class="color-mgray flex fsize-1d1 rw-70">
        <b-list class="grow-1 h-12 bg-color-lgray round-sm bg-color-dgray mrg-r-1 pad-1"
            :scroll="{x: 'hidden', y: 'hidden'}">
            <div class="pad-1">
                <h5>溢出隐藏</h5>
                <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                <div class="pright alpha-d5">—— btxstudio</div>
            </div>
        </b-list>
        <b-list class="grow-1 h-12 bg-color-lgray round-sm bg-color-dgray pad-1"
            :scroll="{x: 'hidden', y: 'auto'}">
            <div class="pad-1">
                <h5>溢出滚动</h5>
                <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                <div class="pright alpha-d5">—— btxstudio</div>
            </div>
        </b-list>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="fsize-1d1 rw-70">
        <b-list class="grow-1 h-12 bg-color-lgray round-sm bg-color-dgray pad-t-2 pad-b-1 pad-h-2"
            :scroll="{x: 'scroll', y: 'hidden'}" 
            scrollType="thick"
            @on_scroll="setScrollDir">
            <h5 class="color-mgray">横向滚动条</h5>
            <div class="flex pad-b-1d5 color-light">
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">html</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">css</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">javascript</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">vue</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">react</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">typescript</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">C++</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">php</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">python</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2 mrg-r-1">ruby</span>
                <span class="bg-color-neutral round-lg pad-v-d5 pad-h-2">linux</span>
            </div>
        </b-list>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view class="fsize-1d1 rw-70 color-mgray">
        <b-list class="grow-1 h-15 bg-color-lgray round-sm bg-color-dgray pad-1"
            :scroll="{x: 'hidden', y: 'scroll'}" 
            @on_to_top="scrollState = '滚动置顶'"
            @on_to_bottom="scrollState = '滚动置底'"
            @on_scroll="setScrollDir_2">
            <div class="bg-color-dgray pad-1">
                <h5>滚动监听</h5>
                <p>When it comes to a secure website and passwords.</p>
                <p>it is all in your hands to create a password.</p>
                <p>that a hacker simply cannot crack.</p>
                <p>When it comes to a secure website and passwords.</p>
                <p>it is all in your hands to create a password.</p>
                <p>that a hacker simply cannot crack.</p>
                <p class="pright alpha-d5">—— btxstudio</p>
            </div>
        </b-list>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
    })
</script>