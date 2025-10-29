<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础按钮 -->
        <section id="Top">
            <h5>基础按钮</h5>
            <p>可以设计为按钮样式，并通过 <code>@on_click</code> 事件绑定点击回调，此外可以通过 <code>hover</code> 属性设置鼠标悬停样式。通过 <code>active</code> 属性设置激活样式。</p>
            <b-view>
                <b-hot class="flex-5 h-3 w-10 bg-color-blue color-light round-sm" 
                    hover="bg-color-C2274f7" 
                    active="bg-color-C0055dd" 
                    @on_click="data_1++">按钮</b-hot>
            </b-view>
            <p>当前计数：<code>{{data_1}}</code></p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 基础链接 -->
        <section class="mrg-t-5">
            <h5>基础链接</h5>
            <p>通过 <code>link</code> 属性可以设置外链或 vue 组件路由；而 <code>forbid</code> 属性则可以禁用链接跳转功能。</p>
            <b-view class="flex-4">
                <b-hot class="color-dark"
                    link="http://baidu.com"  
                    hover="color-blue">baidu.com</b-hot>
                <b-hot class="mrg-l-2 pad-v-d5 pad-h-2 bg-color-blue color-light round-sm" 
                    link="http://baidu.com"
                    :states="{forbid: 'bg-color-mgray color-lgray'}"
                    state="forbid" 
                    :forbid="true">被禁用的百度链接</b-hot>
                <b-hot class="mrg-l-2 pad-v-d5 pad-h-2 bg-color-blue color-light round-sm" 
                    link="/example/base_wid/b_view_demo">跳转 b-view 组件介绍</b-hot>
            </b-view>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 内部跳转 -->
        <section class="mrg-t-5">
            <h5>内部跳转</h5>
            <p>通过 <code>anchor</code> 属性可以设置内链跳转锚点。</p>
            <b-view class="flex">
                <b-hot class="pad-v-d5 pad-h-2 bg-color-blue color-light round-sm" 
                    anchor="#Top">定位 "基础按钮"</b-hot>
            </b-view>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>

        <!-- 下载文件 -->
        <section class="mrg-t-5">
            <h5>下载文件</h5>
            <p>通过 <code>download</code> 属性可以设置执行资源下载操作，并重命名文件。</p>
            <b-view class="flex">
                <b-hot class="pad-v-d5 pad-h-2 bg-color-blue color-light round-sm"
                    download="字体资源包.zip"
                    link="/icons.zip">下载压缩包</b-hot>
            </b-view>
            <pre ref="$code4" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp4"></pre>
        </section>

        <!-- 交互事件 -->
        <section class="mrg-t-5">
            <h5>交互事件</h5>
            <p>组件还提供了 <code>on_dblclick</code>（移动端不支持）、<code>on_enter</code>、<code>on_move</code>、<code>on_level</code>、<code>on_longTouch</code> 等 API 绑定用户交互操作。<code>touch-duration</code> 属性则可设置长按的有效时间值，默认为 1s。</p>
            <b-view class="flex">
                <b-hot class="pad-v-d5 pad-h-2 bg-color-blue color-light round-sm"
                    @on_click="data_2 = '执单双击'"
                    @on_dblclick="data_2 = '执行双击'"
                    @on_enter="data_2 = '开始触控'"
                    @on_leave="data_2 = '结束触控'">按钮</b-hot>
                <b-hot class="pad-v-d5 rel pad-h-2 bg-color-mgray color-light round-sm mrg-l-1 over-hide"
                    @on_enter="touchState = 'enter'"
                    @on_leave="touchState = 'leave'"
                    @on_longTouch="longTouchSuccess">
                    <b-view class="abs max-h bg-color-blue l-0 t-0" :state="touchState"></b-view>
                    <b-text class="rel">长按按钮</b-text>
                </b-hot>
            </b-view>
            <p>当前交互状态：
                <code v-if="data_2">{{ data_2 }}</code>
                <span v-else class="alpha-d5">暂无交互</span>
            </p>
            <pre ref="$code5" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp5"></pre>
        </section>

        <!-- 切换状态 -->
        <section class="mrg-t-5">
            <h5>切换状态</h5>
            <p>通过 <code>states</code>、<code>state</code> 属性配合以实现多种状态的切换，通常可用于实现切换交互效果。</p>
            <b-view class="flex">
                <b-hot class="pad-v-d5 pad-h-2 solid thick-1 line-none bg-color-blue color-light round-sm"
                    @on_click="data_3 = data_3 === '' ? 'close' : ''" 
                    :state="data_3"
                    :states="{
                        close: 'bg-color-none line-blue color-blue'
                    }">{{ data_3 === '' ? '启动' : '结束' }}</b-hot>
            </b-view>
            <pre ref="$code6" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp6"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"
    import { showToast } from "@/components/BTXUI/src/components/core/lib/glob";

    const introduce: HeaderInfoData = {
        name: "b-hot", 
        desc: ["该组件用于实现热点交互操作。"],
        dependent: ["b-style"], 
        api: {
            event: [
                {
                    name: "on_click",
                    ef: "左键单击",
                    params: "event",
                },
                {
                    name: "on_dblclick",
                    ef: "左键双击（移动端不支持）",
                    params: "event",
                },
                {
                    name: "on_enter",
                    ef: "鼠标移入或手指按下",
                    params: "event",
                },
                {
                    name: "on_leave",
                    ef: "鼠标移出或手指抬起",
                    params: "event",
                },
                {
                    name: "on_move",
                    ef: "鼠标移动",
                    params: "event",
                },
                {
                    name: "on_longTouch",
                    ef: "触控长按（仅限移动端）",
                    params: "-",
                },
                {
                    name: "on_transend",
                    ef: "过渡动画结束",
                    params: "-",
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["hover", "string", "鼠标悬停样式集"],
            ["active", "string", "激活样式集"],
            ["link", "string", "外部链接 (format: ^http)"],
            ["link", "string", "组件路由 (format: ^/)"],
            ["link", "string", "手机拨号 (format: tel:xxx)"],
            ["link", "string", "邮件发送 (format: mailto:xxx)"],
            ["anchor", "string", "跳转锚点 (format: #xxx)"],
            ["download", "string", "下载文件名"],
            ["forbid", "boolean", "鼠标点击事件及链接禁用，默认 false，不禁用"],
            ["touchDuration", "number", "长按有效时间，默认 1000ms"],
            ["eventProxy", "boolean", "作为事件代理外层"],
        ] 
    }

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();
    const $code4 = ref();
    const $code5 = ref();
    const $code6 = ref();

    const data_1 = ref(0);
    const data_2 = ref("");
    const data_3 = ref("");

    const touchState = ref('leave');
    const longTouchSuccess = () => {
        showToast('长按成功！')
    }

    const exp1 = `
    <b-view>
        <b-hot class="flex-5 h-3 w-10 bg-color-blue color-light round-sm" 
            hover="bg-color-C2274f7" 
            active="bg-color-C0055dd" 
            @on_click="data_1++">按钮</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="flex-4">
        <b-hot class="color-dark"
            link="http://baidu.com"  
            hover="color-blue">baidu.com</b-hot>
        <b-hot class="mrg-l-2 pad-v-d5 pad-h-2 bg-color-blue color-light round-sm" 
            link="http://baidu.com"
            :states="{forbid: 'bg-color-mgray color-lgray'}"
            state="forbid" 
            :forbid="true">被禁用的百度链接</b-hot>
        <b-hot class="mrg-l-2 pad-v-d5 pad-h-2 bg-color-blue color-light round-sm" 
            link="/example/base_wid/b_view_demo">跳转 b-view 组件介绍</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view class="flex">
        <b-hot class="pad-v-d5 pad-h-2 bg-color-blue color-light round-sm" 
            anchor="#Top">定位 "基础按钮"</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp4 = `
    <b-view class="flex">
        <b-hot class="pad-v-d5 pad-h-2 bg-color-blue color-light round-sm"
            download="字体资源包.zip"
            link="/icons.zip">下载压缩包</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp5 = `
    <b-view class="flex">
        <b-hot class="pad-v-d5 pad-h-2 bg-color-blue color-light round-sm"
            @on_click="data_2 = '执单双击'"
            @on_dblclick="data_2 = '执行双击'"
            @on_enter="data_2 = '开始触控'"
            @on_leave="data_2 = '结束触控'">按钮</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp6 = `
    <b-view class="flex">
        <b-hot class="pad-v-d5 pad-h-2 solid thick-1 line-none bg-color-blue color-light round-sm"
            @on_click="data_3 = data_3 === '' ? 'close' : ''" 
            :state="data_3"
            :states="{
                close: 'bg-color-none line-blue color-blue'
            }">按钮</b-hot>
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
<style>
    [state='enter'] {
        animation: enterAni 1s;
    }
    @keyframes enterAni {
        from {
            width: 0%;
        }
        to {
            width: 100%;
        }
    }
</style>