<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础使用 -->
        <section>
            <h5>基础使用</h5>
            <p>直接通过 <code>options</code> 属性可设置单选框组列表数据，<code>v-model:selected</code> 属性则用于设置初始选中值。</p>
            <radio-group-wid :options="data_1.options" v-model:selected="data_1.selected" />
            <p>所选数据：
                <code v-if="data_1.selected">{{ data_1.selected }}</code>
                <span v-else class="alpha-d5">暂无选择</span>
            </p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 传统单选按钮风格 -->
        <section class="mrg-t-5">
            <h5>传统单选按钮风格</h5>
            <p>通过开启 <code>regular</code> 属性，可设置传统单选按钮样式效果。</p>
            <radio-group-wid :options="data_2.options" :regular="true" v-model:selected="data_2.selected" />
            <p>所选数据：
                <code v-if="data_2.selected">{{ data_2.selected }}</code>
                <span v-else class="alpha-d5">暂无选择</span>
            </p>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 自定义效果插槽 -->
        <section class="mrg-t-5">
            <h5>自定义效果插槽</h5>
            <p>在未开启 <code>regular</code> 属性的前提下，可以使用缺省插槽或具名插槽来定制化组件选框部分，具名插槽命名基于 options 选项的 <code>value</code> 属性。通过作用域 <code>state</code> 属性，可获取 "act" 状态。配合 options 选项的 <code>checkboxData</code> 属性可进行各式定制化样式效果设计。</p>
            <radio-group-wid :options="data_3.options" v-model:selected="data_3.selected">
                <template v-slot="scope">
                    <b-view class="round-sm solid line-mgray thick-1 pad-2-px">
                        <b-view class="h-16-px w-16-px round-sm flex-5 bg-color-C99999944"
                            :state="scope.state"
                            :states="{
                                act: 'bg-color-green color-light'
                            }"></b-view>
                    </b-view>
                </template>
                <template v-slot:css="scope">
                    <b-icon icon="link" class="round w-2d4 h-2d4 flex-5 bg-color-mgray color-light"
                        :state="scope.state"
                        :states="{
                            act: 'bg-color-blue'
                        }" />
                </template>
                <template v-slot:javascript="scope"><span></span></template>
            </radio-group-wid>
            <p>所选数据：
                <code v-if="data_3.selected">{{ data_3.selected }}</code>
                <span v-else class="alpha-d5">暂无选择</span>
            </p>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, onMounted, reactive } from "vue";
    import headerInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";

    const introduce: HeaderInfoData = {
        name: "radio-group-wid", 
        desc: ["该组件用于实现单选框组交互。"],
        dependent: ["checkbox-group-wid"], 
        api: {
            event: [
                {
                    name: "change",
                    ef: "选中值变化",
                    params: "-"
                }
            ]
        },
        initData: [
            ["options", "[*]", "选项集合"],
            ["options[*].label", "string", "选项标签"],
            ["options[*].value", "string", "选项值"],
            ["options[*].checkboxData", "CheckboxData", "参照：checkbox-wid 组件入参"],
            ["v-model:selected", "string", "选中值"],
            ["class", "string", "参照：b-style 组件入参"],
            ["title", "string", "复选框组标题"],
            ["span", "number", "栅格比，数字区间为 [1-12]"],
            ["regular", "boolean", "传统单选按钮风格，默认关闭"],
        ] 
    };

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();

    const data_1 = reactive({
        options: [
            {
                label: 'html',
                value: 'html',
            },
            {
                label: 'css',
                value: 'css',
            },
            {
                label: 'javascript',
                value: 'javascript',
            },
            {
                label: 'nodejs',
                value: 'nodejs',
            }
        ],
        selected: 'css'
    });
    const data_2 = reactive({
        options: [
            {
                label: 'Photoshop',
                value: 'Photoshop',
            },
            {
                label: 'AfterEffects',
                value: 'AfterEffects',
            },
            {
                label: 'Flash',
                value: 'Flash',
            },
            {
                label: 'Coreldraw',
                value: 'Coreldraw',
            }
        ],
        selected: ''
    });
    const data_3 = reactive({
        options: [
            {
                label: 'html',
                value: 'html',
            },
            {
                label: 'css',
                value: 'css',
            },
            {
                label: 'javascript',
                value: 'javascript',
                checkboxData: {
                    class: 'bg-color-lgray round-lg',
                    actClass: 'bg-color-blue color-light'
                }
            },
        ],
        selected: ''
    });

    const exp1 = `
    <radio-group-wid :options="data_1.options" v-model:selected="data_1.selected" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <radio-group-wid :options="data_2.options" :regular="true" v-model:selected="data_2.selected" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <radio-group-wid :options="data_3.options" v-model:selected="data_3.selected">
        <template v-slot="scope">
            <b-view class="round-sm solid line-mgray thick-1 pad-2-px">
                <b-view class="h-16-px w-16-px round-sm flex-5 bg-color-C99999944"
                    :state="scope.state"
                    :states="{
                        act: 'bg-color-green color-light'
                    }"></b-view>
            </b-view>
        </template>
        <template v-slot:css="scope">
            <b-icon icon="link" class="round w-2d4 h-2d4 flex-5 bg-color-mgray color-light"
                :state="scope.state"
                :states="{
                    act: 'bg-color-blue'
                }" />
        </template>
        <template v-slot:javascript="scope"><span></span></template>
    </radio-group-wid>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
    })
</script>