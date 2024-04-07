<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 单体开关使用 -->
        <section>
            <h5>单体开关使用</h5>
            <p>单独使用该组件可用作切换开关，<code>label</code> 属性可对标签文字进行设置。<code>actColor</code> 属性可设置组件选框的激活状态颜色样式。</p>
            <b-view class="flex">
                <checkbox-wid v-model:selected="data_1" />
                <checkbox-wid label="开关" v-model:selected="data_2" class="mrg-h-4" />
                <checkbox-wid :label="['开', '关']" 
                    v-model:selected="data_2" 
                    class="mrg-r-4 bg-color-none" 
                    :act-color="{bg: 'red', icon: 'yellow'}" />
                <checkbox-wid :label="['编辑模式', '退出编辑']" v-model:selected="data_2" />
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 自定义效果插槽 -->
        <section class="mrg-t-5">
            <h5>自定义效果插槽</h5>
            <p>可以使用插槽来定制化组件选框部分，通过作用域 <code>state</code> 属性，可获取 "act" 状态。配合组件本身的 <code>class</code>、<code>actClass</code> 属性可进行各式定制化样式效果设计。</p>
            <b-view class="flex">
                <checkbox-wid v-model:selected="data_3" class="round-lg">
                    <template v-slot="scope">
                        <b-view class="rel round-lg w-5 bg-color-neutral trans-fast"
                            :state="scope.state" 
                            :states="{act: 'bg-color-light'}">
                            <b-view class="rel h-2d5 w-2d5 bg-color-mgray round l-0 trans-fast" 
                                :state="scope.state" 
                                :states="{act: 'bg-color-blue l-2d5'}"></b-view>
                        </b-view>
                    </template>
                </checkbox-wid>
                <checkbox-wid :label="['播放', '暂停']" v-model:selected="data_3" class="mrg-l-4 round-lg" act-class="bg-color-blue color-light">
                    <template v-slot="scope">
                        <b-icon :icon="scope.state === 'act' ? 'pause' : 'play'" class="bg-color-mgray round w-2d5 h-2d5 flex-5"
                            :state="scope.state" 
                            :states="{act: 'bg-color-blue color-light'}" />
                    </template>
                </checkbox-wid>
            </b-view>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import headerInfo from "@/components/header-info";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";

    const introduce: HeaderInfoData = {
        name: "checkbox-wid", 
        desc: ["该组件用于复选框切换选择操作。可嵌套进 <code>checkbox-group-wid</code> 组件进行组合式使用，实现复选框组交互。也可嵌套进 <code>radio-group-wid</code> 组件进行组合式使用，实现单选框组交互。"],
        dependent: ["b-hot", "b-view", "b-icon"], 
        api: {
            event: [
                {
                    name: "change",
                    ef: "选中状态变化",
                    params: "-"
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["actClass", "string", "参照：b-style 组件入参"],
            ["value", "string", "选项值"],
            ["actColor", "-", "选中颜色"],
            ["actColor.bg", "string", "选中框颜色"],
            ["actColor.icon", "string", "选中图标颜色"],
            ["label", "string | [string, string]", "标签文字"],
            ["v-model:selected", "boolean", "选中状态"],
        ] 
    };

    const $code = ref();
    const $code2 = ref();

    const data_1 = ref(false);
    const data_2 = ref(true);
    const data_3 = ref(false);

    const exp1 = `
    <b-view class="flex">
        <checkbox-wid v-model:selected="data_1" />
        <checkbox-wid label="开关" v-model:selected="data_2" class="mrg-h-4" />
        <checkbox-wid :label="['开', '关']" 
            v-model:selected="data_2" 
            class="mrg-r-4 bg-color-none" 
            :act-color="{bg: 'red', icon: 'yellow'}" />
        <checkbox-wid :label="['编辑模式', '退出编辑']" v-model:selected="data_2" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="flex">
        <checkbox-wid v-model:selected="data_3" class="round-lg">
            <template v-slot="scope">
                <b-view class="rel round-lg w-5 bg-color-neutral trans-fast"
                    :state="scope.state" 
                    :states="{act: 'bg-color-light'}">
                    <b-view class="rel h-2d5 w-2d5 bg-color-mgray round l-0 trans-fast" 
                        :state="scope.state" 
                        :states="{act: 'bg-color-blue l-2d5'}"></b-view>
                </b-view>
            </template>
        </checkbox-wid>
        <checkbox-wid :label="['播放', '暂停']" v-model:selected="data_3" class="mrg-l-4 round-lg" act-class="bg-color-blue color-light">
            <template v-slot="scope">
                <b-icon :icon="scope.state === 'act' ? 'pause' : 'play'" class="bg-color-mgray round w-2d5 h-2d5 flex-5"
                    :state="scope.state" 
                    :states="{act: 'bg-color-blue color-light'}" />
            </template>
        </checkbox-wid>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
    })
</script>