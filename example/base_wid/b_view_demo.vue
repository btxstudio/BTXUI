<template>
    <article>
        <header-info v-bind="introduce" />

        <!--设置背景图-->
        <section>
            <h5>设置背景图</h5>
            <p>通过 <code>bgImg</code> 属性可设置背景图，之后可通过背景图相关 class 属性进行其它样式化处理。</p>
            <p>【exp】：</p>
            <b-view class="flex">
                <b-view class="w-10 h-10 round-md mrg-r-9 bg-size-cover" bg-img="/img/head.jpg"></b-view>
                <b-view class="w-10 h-10 round-md bg-size-cover" bg-img="/img/head2.jpg"></b-view>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 auto-scroll" v-html="exp1"></pre>
        </section>

    </article>
</template>

<script setup lang="ts">
    import BView from "@/components/BTXUI/core/b-view/index.vue"
    import introduce from "@/components/BTXUI/core/b-view/doc"
    import hljs from "highlight.js"

    const $code = ref();

    const exp1 = `
    &lt;b-view class="flex"&gt;
        &lt;b-view class="w-10 h-10 round-md mrg-r-9 bg-size-cover" bg-img="/img/head.jpg"&gt;&lt;b-view&gt;
        &lt;b-view class="w-10 h-10 round-md bg-size-cover" bg-img="/img/head2.jpg"&gt;&lt;b-view&gt;
    &lt;/b-view&gt;`;

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>