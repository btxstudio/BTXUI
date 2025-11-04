<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 默认提示弹窗 -->
        <section>
            <h5>默认提示弹窗</h5>
            <p>通过 <code>showToast</code> 方法可以直接调用提示弹窗。</p>
            <p>【exp】：</p>
            <b-view class="flex">
                <b-hot class="pad-h-2 pad-v-d7 round-sm bg-color-lgray" @on_click="showToast('弹窗展示成功!')">显示弹窗</b-hot>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 带图标弹窗 -->
        <section class="mrg-t-5">
            <h5>带图标弹窗</h5>
            <p><code>showToast</code> 方法的第三个参数可以设置弹窗图标，常见的如：<code>success</code>、<code>fail</code> 等（可参考 icon 全局样式）。</p>
            <p>【exp】：</p>
            <b-view class="flex">
                <b-hot class="pad-h-2 pad-v-d7 round-sm bg-color-lgray" @on_click="showToast('数据已提交!', 2000, 'success')">显示弹窗</b-hot>
            </b-view>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 加载提示弹窗 -->
        <section class="mrg-t-5">
            <h5>加载提示弹窗</h5>
            <p>通过 <code>showLoadToast</code> 方法可以显示加载提示弹窗。<code>hideLoadToast</code> 方法则可以隐藏加载提示弹窗。</p>
            <p>【exp】：</p>
            <b-view class="flex-between w-21">
                <btn-wid @on_click="loadData()" btn-text="开始加载" />
                <btn-wid @on_click="loadData2()" btn-text="自定义支付加载" />
            </b-view>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>

        <!-- 自定义弹窗内容 -->
        <section class="mrg-t-5">
            <h5>自定义弹窗内容</h5>
            <p>组件的默认插槽可以自定义弹窗内容及样式，通过 <code>matte-color</code> 属性可以设置遮罩背景色，调用组件实例的 <code>show</code> 方法可以进行弹窗显示。</p>
            <p>【exp】：</p>
            <b-view class="flex">
                <toast-wid ref="$toast" matte-color="rgba_60_50_90_d3">
                    <b-view class="color-green bg-color-light round-sm pad-2">
                        <b-view>Welcome to BTXUI</b-view>
                        <b-view class="line-lgray solid-t thick-1 pad-t-d7 mrg-t-d7 color-dgray pcenter">欢迎您的使用</b-view>
                    </b-view>
                </toast-wid>
                <b-hot class="pad-h-2 pad-v-d7 round-sm bg-color-lgray" @on_click="showCustomToast()">显示弹窗</b-hot>
            </b-view>
            <pre ref="$code4" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp4"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"
    import { showToast, showLoadToast, hideLoadToast } from "@/components/BTXUI/src/components/core/lib/glob";

    const introduce: HeaderInfoData = {
        name: "toast-wid", 
        desc: ["该组件用于提示窗展示。"],
        dependent: ["b-view"], 
        api: {
            methods: [
                {
                    name: 'show',
                    ef: '显示弹窗',
                    params: 'duration',
                    return: '-'
                }
            ]
        },
        initData: [
            ["matteColor", "string", "遮罩颜色"]
        ] 
    }

    const $code = ref();
    const $code2 = ref();
    
    const $code3 = ref();
    const loadData = () => {
        showLoadToast();
        setTimeout(hideLoadToast, 3000);
    }
    const loadData2 = () => {
        showLoadToast('支付中');
        setTimeout(() => {
            hideLoadToast('支付成功', 'success');
        }, 3000);
    }

    const $code4 = ref();
    const $toast = ref();
    const showCustomToast = () => {
        $toast.value.show();
    }

    const exp1 = `
    <b-view class="flex">
        <b-hot class="pad-h-2 pad-v-d7 round-sm bg-color-lgray" @on_click="showToast('弹窗展示成功!')">显示弹窗</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="flex-between w-21">
        <btn-wid @on_click="loadData()" btn-text="开始加载" />
        <btn-wid @on_click="loadData2()" btn-text="自定义支付加载" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view class="flex">
        <b-hot class="pad-h-2 pad-v-d7 round-sm bg-color-lgray" @on_click="loadData()">开始加载</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp4 = `
    <b-view class="flex">
        <toast-wid ref="$toast" matte-color="rgba_60_50_90_d3">
            <b-view class="color-green bg-color-light round-sm pad-2">
                <b-view>Welcome to BTXUI</b-view>
                <b-view class="line-lgray solid-t thick-1 pad-t-d7 mrg-t-d7 color-dgray pcenter">欢迎您的使用</b-view>
            </b-view>
        </toast-wid>
        <b-hot class="pad-h-2 pad-v-d7 round-sm bg-color-lgray" @on_click="showCustomToast()">显示弹窗</b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
        hljs.highlightElement($code4.value);
    })
</script>