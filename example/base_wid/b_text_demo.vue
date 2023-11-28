<template>
    <article>
        <header-info v-bind="introduce" />

        <!--标记文本样式-->
        <section>
            <h5>标记文本样式</h5>
            <p>【exp】：</p>
            <b-view>
                <b-view>If you were a teardrop;<b-text class="bg-color-blue color-light">In my eye,For fear of losing you,I would never cry.</b-text>And if the golden sun,Should cease to shine its light,<b-text class="bold">Just one smile from you,Would make my whole world bright.</b-text></b-view>
                <b-view class="mrg-t-1">如果你是我眼里的一滴泪，<b-text class="color-blue">为了不失去你，我将永不哭泣；</b-text>如果金色的阳光停止了它耀眼的光芒，<b-text class="color-sub">你的一个微笑，将照亮我的整个世界。</b-text></b-view>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 auto-scroll" v-html="exp1"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import BView from "@/components/BTXUI/core/b-view/index.vue"
    import BText from "@/components/BTXUI/core/b-text/index.vue"
    import introduce from "@/components/BTXUI/core/b-text/doc"
    import hljs from "highlight.js"

    const $code = ref();

    const exp1 = `
    <b-view>
        <b-view>If you were a teardrop;<b-text class="bg-color-blue color-light">In my eye,For fear of losing you,I would never cry.</b-text>And if the golden sun,Should cease to shine its light,<b-text class="bold">Just one smile from you,Would make my whole world bright.</b-text></b-view>
        <b-view class="mrg-t-1">如果你是我眼里的一滴泪，<b-text class="color-blue">为了不失去你，我将永不哭泣；</b-text>如果金色的阳光停止了它耀眼的光芒，<b-text class="color-sub">你的一个微笑，将照亮我的整个世界。</b-text></b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>