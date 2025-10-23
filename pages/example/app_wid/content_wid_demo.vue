<template>
    <article>
        <header-info v-bind="introduce" />

        <!--基础目录树渲染-->
        <section>
            <h5>基础目录树渲染</h5>
            <p>组件初始化会对<code>dataTree</code>数据进行索引化增强，以优化后续的交互。通过数据字段 <code>spread</code> 可以默认展开子级；通过 <code>on_select</code> 事件可以获取节点点选操作数据。</p>
            <content-wid :data-tree="data1" @on_select="select1" hover="color-blue" />
            <p>当前选择数据：
                <code v-if="data1Selected">{{data1Selected}}</code>
                <span v-else class="alpha-d4">暂无</span>
            </p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!--自定义节点-->
        <section class="mrg-t-5">
            <h5>自定义节点</h5>
            <p>可以通过插槽形式来自定义节点样式及内容。</p>
            <div class="pad-d5 bg-color-dgray round-sm">
                <content-wid :data-tree="data2" @on_select="select2">
                    <b-view>
                        <b-icon icon="" />
                        <b-text>23</b-text>
                    </b-view>
                </content-wid>
            </div>
            <p>当前选择数据：
                <code v-if="data2Selected">{{data2Selected}}</code>
                <span v-else class="alpha-d4">暂无</span>
            </p>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!--复选操作-->
        <!-- <section>
            <h5>复选操作</h5>
            <p>通过 <code>mode</code> 属性可以设置复选模式，之后可通过数据字段 <code>checkbox</code> 启用复选框，在复选模式下，若数据项未设置 checkbox，则显示为普通文本；通过数据字段 <code>selected</code> 可用于初始化默认选择数据。</p>
            <p>通过数据字段 <code>selected</code> 可用于初始化默认选择数据。</p>
            <div class="resize pad-d5 bg-color-lgray round-sm">
                <content-wid v-bind="data_3.props" @on_select="$_select_3" />
            </div>
            <p>当前选择数据：
                <template v-if="data_3.selected.length">
                    <code v-for="data of data_3.selected">{{data}}</code>
                </template>
                <span v-else class="alpha-d4">暂无</span>
            </p>
            <hr>
            <p></p>
        </section> -->

        <!--提示浮框-->
        <!-- <section>
            <h5>提示浮框</h5>
            <div class="resize pad-d5 bg-color-lgray round-sm">
                <content-wid v-bind="data_4.props" />
            </div>
        </section> -->
    </article>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import HeaderInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";

    const introduce: HeaderInfoData = {
        name: "content-wid", 
        desc: ["该组件用于处理树形结构数据的可视化及交互操作。"],
        dependent: ["b-view", "b-hot", "b-icon", "content-wid"], 
        api: {
            methods: [
                {
                    name: "clear_selected",
                    ef: "清空所选数据",
                    params: "-",
                    return: "-"
                }
            ],
            event: [
                {
                    name: "on_select",
                    ef: "执行数据项点选",
                    params: "dataTreeItem"
                }
            ]
        },
        initData: [
            ["dataTree", "[*]", "树形结构数据"],
            ["dataTree.id", "string", "数据标识"],
            ["dataTree.text", "string", "数据标题"],
            ["dataTree.checkbox", "boolean", "是否显示复选框，缺省仅显示文字"],
            ["dataTree.selected", "boolean", "是否选中，缺省不选中"],
            ["dataTree.children", "DataTree|null", "嵌套结构，可缺省"],
            ["dataTree.spread", "boolean", "是否展开子级，缺省关闭"],
            ["sub", "boolean", "是否为后续节点（无需手动设置）"],
            ["gap", "string", "节点层级间距样式值"],
            ["indent", "string", "节点层级缩进样式值"],
            ["hover", "string", "节点鼠标悬停时样式值"],
            ["active", "string", "节点激活时样式值"],
            ["mode", "'radio'|'checkbox'", "选择模式（默认单选）"],
            ["iconData", "string", "参照：b-icon 组件入参"],
            ["hotData", "boolean", "参照：b-hot 组件入参"]
        ]
    };

    const $code = ref();
    const data1 = [
        {
            id: "html",
            text: "html",
            children: [
                {
                    id: "div",
                    text: "div 标签"
                },
                {
                    id: "span",
                    text: "span 标签",
                },
                {
                    id: "a",
                    text: "a 标签",
                },
            ]
        },
        {
            id: "css",
            text: "css",
            spread: true,
            children: [
                {
                    id: "color",
                    text: "color 文字颜色",
                },
                {
                    id: "background",
                    text: "background 背景样式",
                },
            ]
        },
        {
            id: "javascript",
            text: "javascript",
            children: [
                {
                    id: "OOP",
                    text: "面向对象编程",
                },
                {
                    id: "ES6",
                    text: "ES6 语法",
                },
            ]
        },
        {
            id: "php",
            text: "php"
        },
        {
            id: "python",
            text: "python"
        }
    ];
    const data1Selected = ref("");
    const select1 = (item: any) => {
        data1Selected.value = `所选数据序号【${item.prefix}】${item.id}，值为:${item.text}`;
    };

    const $code2 = ref();
    const data2 = [
        {
            id: "html",
            text: "html",
            children: [
                {
                    id: "div",
                    text: "div 标签",
                },
                {
                    id: "span",
                    text: "span 标签",
                },
                {
                    id: "a",
                    text: "a 标签",
                },
            ]
        },
        {
            id: "css",
            text: "css",
            spread: true,
            children: [
                {
                    id: "color",
                    text: "color 文字颜色",
                    children: [
                        {
                            id: "red",
                            text: "red 玫红",
                        },
                        {
                            id: "yellow",
                            text: "yellow 橙黄",
                        },
                    ]
                },
                {
                    id: "background",
                    text: "background",
                },
            ]
        }
    ];
    const data2Selected = ref("");
    const select2 = (item: any) => {
        data2Selected.value = `所选数据序号【${item.prefix}】${item.id}，值为:${item.text}`;
    };

    const data_3 = {
        props: {
            dataTree: [
                {
                    id: "html_1",
                    text: "html",
                    checkbox: true,
                    children: [
                        {
                            id: "div_1_1",
                            text: "div 标签",
                            selected: true,
                            checkbox: true
                        },
                        {
                            id: "span_1_2",
                            text: "span 标签",
                            checkbox: true
                        },
                        {
                            id: "a_1_3",
                            text: "a 标签"
                        },
                    ]
                },
                {
                    id: "css_2",
                    text: "css",
                    children: [
                        {
                            id: "color_2_1",
                            text: "color 文字颜色",
                            selected: true,
                            checkbox: true,
                            children: [
                                {
                                    id: "color_3_1",
                                    text: "red 玫红",
                                    checkbox: true
                                },
                                {
                                    id: "color_3_2",
                                    text: "yellow 橙黄",
                                    checkbox: true
                                },
                            ]
                        },
                        {
                            id: "background_2_2",
                            text: "background 背景样式"
                        },
                    ]
                },
                {
                    id: "javascript_3",
                    text: "javascript"
                },
            ],
            mode: "checkbox",
            colors: {
                normal: {
                    text: "dgray",
                    bg: "light",
                },
                act: {
                    text: "light",
                    bg: "blue",
                },
                hover: {
                    text: "dark",
                    bg: "neutral",
                }
            },
        },
        selected: ["div_1_1", "color_2_1"]
    };

    const data_4 = {
        props: {
            dataTree: [
                {
                    id: "css_2",
                    text: "css",
                    spread: true,
                    children: [
                        {
                            id: "color_2_1",
                            text: "color 文字颜色",
                            children: [
                                {
                                    id: "color_3_1",
                                    text: "red 玫红"
                                },
                                {
                                    id: "color_3_2",
                                    text: "yellow 橙黄"
                                },
                            ]
                        },
                        {
                            id: "background_2_2",
                            text: "background 背景样式"
                        },
                    ]
                }
            ],
            colors: {
                normal: {
                    text: "dgray",
                    bg: "neutral",
                },
                act: {
                    text: "light",
                    bg: "blue",
                },
                hover: {
                    text: "dark",
                    bg: "rgba(134,134,134,.24)",
                }
            }
        }
    }

    // const $_select_1 = (id){
    //     this.data_1.selected = id;
    // }

    // const $_select_2 = (id){
    //     this.data_2.selected = id;
    // }

    // const $_select_3 = (ids){
    //     this.data_3.selected = ids;
    // }

    const exp1 = `
    <content-wid :data-tree="data1" @on_select="select1" hover="color-blue" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <content-wid :data-tree="data1" @on_select="select1" hover="color-blue" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
    })
</script>