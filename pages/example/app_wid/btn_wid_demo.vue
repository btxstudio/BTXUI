<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础按钮 -->
        <section>
            <h5>基础按钮</h5>
            <p>通过 <code>btn-text</code> 属性实现按钮文字。通过 <b>on_click</b> 事件实现点击回调。</p>
            <b-view class="flex">
                <btn-wid btn-text="点击加一" @on_click="data_1++" />
            </b-view>
            <p>点击次数：<code>{{ data_1 }}</code></p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 自定义配色按钮 -->
        <section class="mrg-t-5">
            <h5>自定义配色按钮</h5>
            <p>通过 <code>btn-color</code> 属性设置按钮颜色风格。分别支持 "常规状态"、"悬停状态"、"激活状态" 下的文字色（text）、背景色（bg）、描边色（line）。</p>
            <b-view class="flex">
                <btn-wid btn-text="自定义风格按钮" :btn-color="{
                    normal: {
                        text: 'light',
                        bg: 'blue',
                        line: 'rgb_15_94_219',
                    },
                    hover: {
                        text: 'yellow',
                        bg: 'C444',
                        line: 'C222',
                    },
                    active: {
                        text: 'yellow',
                        bg: 'C222',
                        line: 'C222',
                    },
                }" />
            </b-view>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!--大圆角按钮-->
        <section class="mrg-t-5">
            <h5>大圆角按钮</h5>
            <p>通过 <code>btn-round</code> 属性可设置按钮为大圆角效果。</p>
            <b-view class="flex">
                <btn-wid btn-text="大圆角按钮" :btn-round="true" />
            </b-view>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>

        <!--定宽按钮-->
        <section class="mrg-t-5">
            <h5>定宽按钮</h5>
            <p>通过 <code>btn-width</code> 属性可设置按钮最小宽度，其默认单位为 rem。</p>
            <b-view class="flex">
                <btn-wid btn-text="定宽按钮" :btn-width="17" />
            </b-view>
            <pre ref="$code4" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp4"></pre>
        </section>

        <!--渐变按钮-->
        <section class="mrg-t-5">
            <h5>渐变按钮</h5>
            <p>通过 <code>btn-color</code> 属性设置背景色时可以使用渐变样式。</p>
            <b-view class="flex">
                <btn-wid btn-text="渐变按钮" :btn-color="{
                    normal: {
                        text: 'light',
                        bg: 'linear_45_blue_green',
                        line: 'none',
                    },
                    hover: {
                        text: 'Cffcc00',
                        bg: 'linear_45_C222_C555',
                        line: 'none',
                    },
                    active: {
                        text: 'Cffcc00',
                        bg: 'linear_45_C555_C222',
                        line: 'none',
                    },
                }" :btn-round="true" :btn-width="14" />
            </b-view>
            <pre ref="$code5" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp5"></pre>
        </section>

        <!--链接按钮-->
        <section class="mrg-t-5">
            <h5>链接按钮</h5>
            <p>通过 <code>hotData</code> 属性可进行 <code>b-hot</code> 组件配置。包括： <b>link</b> 字段设置按钮链接效果，<b>forbid</b> 字段实现点击禁用等。</p>
            <b-view class="flex">
                <b-view class="mrg-r-1">
                    <btn-wid btn-text="跳转七武海官网" :hot-data="{
                        link: 'http://www.75sea.com'
                    }" />
                </b-view>
                <b-view>
                    <btn-wid btn-text="禁用链接" :hot-data="{
                        link: 'http://www.75sea.com',
                        forbid: true
                    }" />
                </b-view>
            </b-view>
            <pre ref="$code6" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp6"></pre>
        </section>

        <!--含图标按钮-->
        <section class="mrg-t-5">
            <h5>含图标按钮</h5>
            <p>通过 <code>iconData</code> 属性可进行 <code>b-icon</code> 组件配置。可以为按钮插入图标。</p>
            <b-view class="flex">
                <btn-wid btn-text="删除" :icon-data="{icon: 'del'}" />
            </b-view>
            <pre ref="$code7" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp7"></pre>
        </section>

    </article>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import headerInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";

    const introduce: HeaderInfoData = {
        name: "btn-wid", 
        desc: ["该组件用于实现按钮交互操作。"],
        dependent: ["b-icon", "b-hot"], 
        api: {
            event: [
                {
                    name: "on_click",
                    ef: "点击触发",
                    params: "-"
                }
            ]
        },
        initData: [
            ["btnText", "string", "按钮文字"],
            ["btnRound", "boolean", "启用大圆角效果"],
            ["btnWidth", "number", "按钮固定宽度"],
            ["iconData", "string", "参照：b-icon 组件入参"],
            ["hotData", "boolean", "参照：b-hot 组件入参"]
        ] 
    };

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();
    const $code4 = ref();
    const $code5 = ref();
    const $code6 = ref();
    const $code7 = ref();

    const data_1 = ref(0);

    const exp1 = `
    <b-view class="flex">
        <btn-wid btn-text="点击加一" @on_click="data_1++" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="flex">
        <btn-wid btn-text="自定义风格按钮" :btn-color="{
            normal: {
                text: 'light',
                bg: 'blue',
                line: 'rgb_15_94_219',
            },
            hover: {
                text: 'yellow',
                bg: 'C444',
                line: 'C222',
            },
            active: {
                text: 'yellow',
                bg: 'C222',
                line: 'C222',
            },
        }" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view class="flex">
        <btn-wid btn-text="大圆角按钮" :btn-round="true" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    const exp4 = `
    <b-view class="flex">
        <btn-wid btn-text="定宽按钮" :btn-width="17" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp5 = `
    <b-view class="flex">
        <btn-wid btn-text="渐变按钮" :btn-color="{
            normal: {
                text: 'light',
                bg: 'linear_45_blue_green',
                line: 'none',
            },
            hover: {
                text: 'Cffcc00',
                bg: 'linear_45_C222_C555',
                line: 'none',
            },
            active: {
                text: 'Cffcc00',
                bg: 'linear_45_C555_C222',
                line: 'none',
            },
        }" :btn-round="true" :btn-width="14" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp6 = `
    <b-view class="flex">
        <b-view class="mrg-r-1">
            <btn-wid btn-text="跳转七武海官网" :hot-data="{
                link: 'http://www.75sea.com'
            }" />
        </b-view>
        <b-view>
            <btn-wid btn-text="禁用链接" :hot-data="{
                forbid: true
            }" />
        </b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp7 = `
    <b-view class="flex">
        <btn-wid btn-text="删除" :icon-data="{icon: 'del'}" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
        hljs.highlightElement($code4.value);
        hljs.highlightElement($code5.value);
        hljs.highlightElement($code6.value);
        hljs.highlightElement($code7.value);
    })
</script>