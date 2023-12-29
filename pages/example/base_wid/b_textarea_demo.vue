<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础使用 -->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>v-model:text</code> 属性可设置文本输入内容，并进行双向绑定，输出文本会自动进行换行格式化处理。</p>
            <b-view>
                <b-textarea class="pad-1 bg-color-lgray round-md line-Cddd" 
                    name="blog"
                    v-model:text="data_1" 
                    placeholder="请输入文字内容..." />
            </b-view>
            <p>
                <code v-if="data_1" v-html="data_1"></code>
                <span v-else class="alpha-d5">暂无内容</span>
            </p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-textarea", 
        desc: ["该组件用于实现多行输入型表单元素。"],
        dependent: ["b-style"], 
        api: {
            event: [
                {
                    name: "on_focus",
                    ef: "表单聚焦",
                    params: "event",
                },
                {
                    name: "on_change",
                    ef: "表单输入变化",
                    params: "event",
                },
                {
                    name: "on_blur",
                    ef: "表单失焦",
                    params: "event",
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["v-model:text", "string", "表单输入内容"],
            ["placeholder", "string", "输入提示"],
            ["rows", "number", "显示最大行数，默认 7 行"]
        ] 
    }

    const $code = ref();

    const data_1 = ref("");

    const exp1 = `
    <b-view>
        <b-textarea class="pad-1 bg-color-lgray round-md line-Cddd" 
            name="blog"
            v-model:text="data_1" 
            placeholder="请输入文字内容..." />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>