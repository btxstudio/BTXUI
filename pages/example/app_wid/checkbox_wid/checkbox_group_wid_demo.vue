<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础使用 -->
        <section>
            <h5>基础使用</h5>
            <p>直接通过 <code>options</code> 属性可设置复选框组列表数据，<code>v-model:selected</code> 属性则用于设置选中值集合。</p>
            <checkbox-group-wid :options="data_1.options" v-model:selected="data_1.selected" />
            <p>所选数据：
                <code v-if="data_1.selected.length">{{ data_1.selected }}</code>
                <span v-else class="alpha-d5">暂无选择</span>
            </p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 自定义效果插槽 -->
        <section class="mrg-t-5">
            <h5>自定义效果插槽</h5>
            <p>可以使用缺省插槽或具名插槽来定制化组件选框部分，具名插槽命名基于 options 选项的 <code>value</code> 属性。通过作用域 <code>state</code> 属性，可获取 "act" 状态。配合 options 选项的 <code>checkboxData</code> 属性可进行各式定制化样式效果设计。</p>
            <p>【示例1】公共模板样式：</p>
            <checkbox-group-wid :options="data_2.options" v-model:selected="data_2.selected">
                <template v-slot="scope">
                    <b-view class="round-sm solid line-mgray thick-1 pad-2-px">
                        <b-view class="h-16-px w-16-px round-sm flex-5 bg-color-C99999944"
                            :state="scope.state"
                            :states="{
                                act: 'bg-color-green color-light'
                            }"></b-view>
                    </b-view>
                </template>
            </checkbox-group-wid>
            <p>所选数据：
                <code v-if="data_2.selected.length">{{ data_2.selected }}</code>
                <span v-else class="alpha-d5">暂无选择</span>
            </p>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
            <p class="mrg-t-3">【示例2】定制化模板样式：</p>
            <checkbox-group-wid :options="data_3.options" v-model:selected="data_3.selected" @change="data_3.change">
                <template v-slot:lcz="scope">
                    <b-icon icon="about" class="round w-2 h-2 flex-5 bg-color-mgray color-light"
                    :state="scope.state"
                    :states="{
                        act: 'bg-color-blue'
                    }" />
                </template>
                <template v-slot><span></span></template>
            </checkbox-group-wid>
            <p>所选数据：
                <code v-if="data_3.selectedLabel.length">{{ data_3.selectedLabel }}</code>
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
        name: "checkbox-group-wid", 
        desc: ["该组件用于实现复选框组交互。"],
        dependent: ["b-view", "b-row", "b-col", "checkbox-wid"], 
        api: {
            event: [
                {
                    name: "change",
                    ef: "选中值变化",
                    params: "{ label: string, value: string }[]"
                }
            ]
        },
        initData: [
            ["options", "[*]", "选项集合"],
            ["options[*].label", "string", "选项标签"],
            ["options[*].value", "string", "选项值"],
            ["options[*].checkboxData", "CheckboxData", "参照：checkbox-wid 组件入参"],
            ["v-model:selected", "Array<string>", "选中值集合"],
            ["class", "string", "参照：b-style 组件入参"],
            ["title", "string", "复选框组标题"],
            ["span", "number", "栅格比，数字区间为 [1-12]"],
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
        selected: ['css']
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
        selected: []
    });
    const data_3 = reactive({
        options: [
            {
                label: '柳传志',
                value: 'lcz',
            },
            {
                label: '马云',
                value: 'my',
            },
            {
                label: '张一鸣',
                value: 'zym',
                checkboxData: {
                    actClass: 'color-light bg-color-blue round-lg'
                }
            }
        ],
        selected: [],
        selectedLabel: [],
        change: (selected: any) => {
            data_3.selectedLabel = selected.map((item: any) => item.label);
        }
    });

    const exp1 = `
    <checkbox-group-wid :options="data_1.options" v-model:selected="data_1.selected" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <checkbox-group-wid :options="data_2.options" v-model:selected="data_2.selected">
        <template v-slot="scope">
            <b-view class="round-sm solid line-mgray thick-1 pad-2-px">
                <b-view class="h-16-px w-16-px round-sm flex-5 bg-color-C99999944"
                    :state="scope.state"
                    :states="{
                        act: 'bg-color-green color-light'
                    }"></b-view>
            </b-view>
        </template>
    </checkbox-group-wid>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <checkbox-group-wid :options="data_3.options" v-model:selected="data_3.selected" @change="data_3.change">
        <template v-slot:lcz="scope">
            <b-icon icon="about" class="round w-2 h-2 flex-5 bg-color-mgray color-light"
                :state="scope.state"
                :states="{
                    act: 'bg-color-blue'
                }" />
        </template>
        <template v-slot></template>
    </checkbox-group-wid>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
    })
</script>