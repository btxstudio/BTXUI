<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 字体图标 -->
        <section>
            <h5>字体图标</h5>
            <p>通过 <code>icon</code> 属性即可设置框架预置字体图标，图标字体源来自框架的 css 文件，图标效果可参考 <b>"全局样式 - 图标"</b>。</p>
            <p>系统预置字体图标：</p>
            <b-view class="flex-between fsize-2 w-40">
                <b-icon icon="download" />
                <b-icon icon="ui" />
                <b-icon icon="list" class="color-red" />
                <b-icon icon="system" class="color-blue" />
                <b-icon icon="user" class="color-green" />
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 自定义扩展字体图标 -->
        <section class="mrg-t-5">
            <h5>自定义扩展字体图标</h5>
            <p>也可以使用自定义字体图标，需要首先引入相应字体图标样式文件，然后设置 <code>class</code> 属性 <b>font-*</b> 样式值为对应字体名，再通过 <code>icon</code> 属性绑定图标名（图标类名必须符合 <b>ico-name</b> 格式，图标名即 <b>name</b>）即可。</p>
            <b-view class="flex-between fsize-2 w-40">
                <b-icon class="font-_iconfont" icon="info" />
                <b-icon class="font-_iconfont" icon="phone" />
                <b-icon class="font-_iconfont" icon="integral" />
                <b-icon class="font-_iconfont" icon="assets" />
                <b-icon class="font-_iconfont" icon="readed" />
            </b-view>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 图片图标 -->
        <section class="mrg-t-5">
            <h5>图片图标</h5>
            <p>也可以通过 <code>icon</code> 属性引入图片作为图标。</p>
            <b-view>
                <b-icon icon="/img/home_ico.png" class="h-20-px bsize-contain" />
            </b-view>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>

        <!--css 动画图标-->
        <section class="mrg-t-5">
            <h5>css 动画图标</h5>
            <p>可以使用框架预置的 4 项 css 动画图标（动画机制：html 标签 + css），同样通过 <code>icon</code> 属性进行设置，属性值分别为：<b>ani_success</b>、<b>ani_fail</b>、<b>ani_notic</b>、<b>ani_loading</b>。</p>
            <b-view class="flex-between w-40">
                <b-icon icon="ani_success" />
                <b-icon icon="ani_fail" />
                <b-icon icon="ani_notic" />
                <b-icon icon="ani_loading" />
            </b-view>
            <pre ref="$code4" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp4"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"
    import "@/assets/custom_fonts/iconfont.css"

    const introduce: HeaderInfoData = {
        name: "b-icon", 
        desc: ["该组件用于显示图标，包括 “字体图标”、“图片图标”、“css 动画图标”。"],
        dependent: ["b-style", "b-img", "ani-success", "ani-fail", "ani-notic", "ani-loading"], 
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["icon", "string", "字体图标名 (无需 ico 前缀)"],
            ["icon", "string", "动态图标 (ani_success、ani_fail、ani_notic、ani_loading)"],
            ["icon", "string", "图片图标地址"]
        ] 
    }

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();
    const $code4 = ref();

    const exp1 = `
    <b-view class="flex-between fsize-2 w-40">
        <b-icon icon="download" />
        <b-icon icon="ui" />
        <b-icon icon="list" class="color-red" />
        <b-icon icon="system" class="color-blue" />
        <b-icon icon="user" class="color-green" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="flex-between fsize-2 w-40">
        <b-icon class="font-iconfont" icon="info" />
        <b-icon class="font-iconfont" icon="phone" />
        <b-icon class="font-iconfont" icon="integral" />
        <b-icon class="font-iconfont" icon="assets" />
        <b-icon class="font-iconfont" icon="readed" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view>
        <b-icon icon="/img/home_ico.png" class="h-20-px" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp4 = `
    <b-view class="flex-between w-40">
        <b-icon icon="ani_success" />
        <b-icon icon="ani_fail" />
        <b-icon icon="ani_notic" />
        <b-icon icon="ani_loading" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
        hljs.highlightElement($code4.value);
    })
</script>