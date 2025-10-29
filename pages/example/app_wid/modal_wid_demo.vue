<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础使用 -->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>v-model:visiable</code> 属性即可控制模态框的显示与隐藏。</p>
            <p>【exp】：</p>
            <modal-wid v-model:visiable="data1">
                hello BTXUI
            </modal-wid>
            <p class="flex">
                <btn-wid btn-text="显示默认模态窗" @on_click="data1 = true" />
            </p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 方向设置 -->
        <section class="mrg-t-5">
            <h5>方向设置</h5>
            <p>通过 <code>dir</code> 属性可以设置模态框的位置，不同位置对应着不同的入场出场动画。此外还可以使用 <code>matte-color</code>、<code>pannel-color</code>、<code>round-enable</code> 等属性设置模态框的基础样式。</p>
            <p>【exp】：</p>
            <modal-wid v-model:visiable="data2.top" dir="top" matte-color="Cf9267269">
                <div>hello BTXUI</div>
                <div>I am top side</div>
            </modal-wid>
            <modal-wid v-model:visiable="data2.left" dir="left" pannel-color="yellow" :close-enable="true">
                <div class="pad-t-2">hello BTXUI</div>
                <div>I am left side</div>
            </modal-wid>
            <modal-wid v-model:visiable="data2.right" dir="right" matte-color="light" pannel-color="dark">
                <div class="color-light pad-t-2">hello BTXUI</div>
                <div class="color-lgray">I am right side</div>
            </modal-wid>
            <modal-wid v-model:visiable="data2.center" dir="center" :round-enable="true">
                <div class="pad-h-1 pcenter">
                    <p>hello BTXUI</p>
                    <p class="alpha-d4">I am center side</p>
                </div>
            </modal-wid>
            <p class="flex-between w-25">
                <btn-wid btn-text="顶部" @on_click="data2.top = true" />
                <btn-wid btn-text="左侧" @on_click="data2.left = true" />
                <btn-wid btn-text="右侧" @on_click="data2.right = true" />
                <btn-wid btn-text="中间" @on_click="data2.center = true" />
            </p>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 自定义模态框 -->
        <section class="mrg-t-5">
            <h5>自定义模态框</h5>
            <p>可以通过 <code>#custom</code> 插槽来自定义模态框内容。</p>
            <p>【exp】：</p>
            <modal-wid v-model:visiable="data3" dir="center" :close-enable="true">
                <template #custom>
                    <div class="w-30 bg-color-light pad-1">
                        <p class="bold fsize-1d4 pcenter">Here is a Picture</p>
                        <img src="/img/banner2.jpg" class="round-sm" />
                        <hr/>
                        <p class="pright">author: btxstudio</p>
                    </div>
                </template>
            </modal-wid>
            <p class="flex">
                <btn-wid btn-text="显示默认模态窗" @on_click="data3 = true" />
            </p>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import headerInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";

    const introduce: HeaderInfoData = {
        name: "modal-wid", 
        desc: ["该组件用于模态窗面板显示。"],
        dependent: ["b-view", "b-hot", "b-icon"], 
        initData: [
            ["v-model:visiable", "boolean", "模态窗显示状态"],
            ["matteColor", "string", "模态窗背景遮罩颜色样式值"],
            ["pannelColor", "string", "模态窗面板颜色样式值"],
            ["closeEnable", "boolean", "是否启用关闭按钮"],
            ["roundEnable", "boolean", "是否启用圆角面板"],
            ["dir", "'left'|'right'|'top'|'bottom'|'center'", "面板位置"],
        ] 
    };

    const data1: any = ref(false);

    const data2: any = ref({
        top: false,
        left: false,
        right: false,
        center: false
    })

    const data3: any = ref(false);

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();

    const exp1 = `
    <modal-wid v-model:visiable="data1">
        hello BTXUI
    </modal-wid></b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <modal-wid v-model:visiable="data2.top" dir="top" matte-color="Cf9267269">
        <div>hello BTXUI</div>
        <div>I am top side</div>
    </modal-wid>
    <modal-wid v-model:visiable="data2.left" dir="left" pannel-color="yellow" :close-enable="true">
        <div class="pad-t-2">hello BTXUI</div>
        <div>I am left side</div>
    </modal-wid>
    <modal-wid v-model:visiable="data2.right" dir="right" matte-color="light" pannel-color="dark">
        <div class="color-light pad-t-2">hello BTXUI</div>
        <div class="color-lgray">I am right side</div>
    </modal-wid>
    <modal-wid v-model:visiable="data2.center" dir="center" :round-enable="true">
        <div class="pad-h-1 pcenter">
            <p>hello BTXUI</p>
            <p class="alpha-d4">I am center side</p>
        </div>
    </modal-wid>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <modal-wid v-model:visiable="data3" dir="center" :close-enable="true">
        <template #custom>
            <div class="w-30 bg-color-light pad-1">
                <p class="bold fsize-1d4 pcenter">Here is a Picture</p>
                <img src="/img/banner2.jpg" class="round-sm" />
                <hr/>
                <p class="pright">author: btxstudio</p>
            </div>
        </template>
    </modal-wid>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
    })
</script>