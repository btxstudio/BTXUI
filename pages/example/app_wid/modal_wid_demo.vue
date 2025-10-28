<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础使用 -->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>spread</code> 属性来设置常规分布导航按钮；通过 <code>center</code> 属性则可设置居中主导航按钮；此外 <code>colors</code> 属性可设置组件色彩风格，导航按钮会基于当前路由进行高亮样式显示。</p>
            <p>通过组件 API <code>on_toggle</code> 事件可以响应点击按钮回调，自变量参数为按钮索引。</p>
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

        <!-- 自定义面板 -->
    </article>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from "vue";
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
            ["closeEnable", "boolean", "是否启用关闭按钮"],
            ["roundEnable", "boolean", "是否启用圆角面板"],
            ["dir", "'left'|'right'|'top'|'bottom'|'center'", "面板位置"],
        ] 
    };

    const data1: any = ref(false);

    const $code = ref();

    const exp1 = `
    <modal-wid v-model:visiable="data1">
        hello BTXUI
    </modal-wid></b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>