<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础渲染-->
        <section>
            <h5>基础渲染</h5>
            <p>组件初始化数据会将树形结构数据转换为平级索引结构数据（index_data），以便于后续的快速选取操作，默认为单选效果；通过数据字段 <code>spread</code> 可以默认展开子级；通过数据字段 <code>spread_fixed</code> 可以强制展开子级，禁止收起；通过数据字段 <code>selected</code> 可用于初始化默认选择数据。</p>
            <div class="resize">
                <content-wid v-bind="data_1.props" @on_select="$_select_1" />
            </div>
            <p>当前选择数据：
                <code v-if="data_1.selected">{{data_1.selected}}</code>
                <span v-else class="alpha-d4">暂无</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--自定义样式-->
        <section>
            <h5>自定义样式</h5>
            <p>数据字段 <code>text</code> 支持富文本以实现自定义样式扩展；通过 <code>colors</code> 属性可以定义组件项目色彩方案。</p>
            <div class="resize pad-d5 bg-color-dgray round-sm">
                <content-wid v-bind="data_2.props" @on_select="$_select_2" />
            </div>
            <p>当前选择数据：
                <code v-if="data_2.selected">{{data_2.selected}}</code>
                <span v-else class="alpha-d4">暂无</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--复选操作-->
        <section>
            <h5>复选操作</h5>
            <p>通过 <code>mode</code> 属性可以设置复选模式，之后可通过数据字段 <code>checkbox</code> 启用复选框，在复选模式下，若数据项未设置 checkbox，则显示为普通文本；通过数据字段 <code>selected</code> 可用于初始化默认选择数据。</p>
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
        </section>

        <!--提示浮框-->
        <section>
            <h5>提示浮框</h5>
            <p>数据字段 <code>tooltip</code> 支持富文本以实现悬停提示文本；通过 <code>tooltipData</code> 属性可以设置提示框色彩风格及定位。</p>
            <div class="resize pad-d5 bg-color-lgray round-sm">
                <content-wid v-bind="data_4.props" />
            </div>
        </section>
    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import ContentWid from "@/components/BTXUI/content/content-wid"

    export default {
        name: "content_wid_demo",
        components: {
            HeaderInfo,
            ContentWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: ContentWid.name,
                    ...ContentWid.introduce,
                },

                data_1: {
                    props: {
                        dataTree: [
                            {
                                id: "html_1",
                                text: "html",
                                children: [
                                    {
                                        id: "div_1_1",
                                        text: "div 标签",
                                        selected: true
                                    },
                                    {
                                        id: "span_1_2",
                                        text: "span 标签",
                                    },
                                    {
                                        id: "a_1_3",
                                        text: "a 标签",
                                    },
                                ]
                            },
                            {
                                id: "css_2",
                                text: "css",
                                spread: true,
                                children: [
                                    {
                                        id: "color_2_1",
                                        text: "color 文字颜色",
                                    },
                                    {
                                        id: "background_2_2",
                                        text: "background 背景样式",
                                    },
                                ]
                            },
                            {
                                id: "javascript_3",
                                text: "javascript",
                                spread_fixed: true,
                                children: [
                                    {
                                        id: "OOP_3_1",
                                        text: "面向对象编程",
                                    },
                                    {
                                        id: "ES6_3_2",
                                        text: "ES6 语法",
                                    },
                                ]
                            },
                            {
                                id: "php_4",
                                text: "php"
                            },
                            {
                                id: "python_5",
                                text: "python"
                            }
                        ]
                    },
                    selected: "div_1_1"
                },

                data_2: {
                    props: {
                        dataTree: [
                            {
                                id: "html_1",
                                text: "<b style='font-size: 17px'>html</b>",
                                children: [
                                    {
                                        id: "div_1_1",
                                        text: "div 标签",
                                    },
                                    {
                                        id: "span_1_2",
                                        text: "span 标签",
                                    },
                                    {
                                        id: "a_1_3",
                                        text: "a 标签",
                                    },
                                ]
                            },
                            {
                                id: "css_2",
                                text: "<b style='color: orange'>css</b>",
                                spread: true,
                                children: [
                                    {
                                        id: "color_2_1",
                                        text: "color 文字颜色",
                                        children: [
                                            {
                                                id: "color_3_1",
                                                text: "red 玫红",
                                            },
                                            {
                                                id: "color_3_2",
                                                text: "yellow 橙黄",
                                            },
                                        ]
                                    },
                                    {
                                        id: "background_2_2",
                                        text: "<b style='color: #02b9a1'>background</b> 背景样式",
                                    },
                                ]
                            }
                        ],
                        colors: {
                            normal: {
                                text: "mgray",
                                bg: "neutral",
                            },
                            act: {
                                text: "blue",
                                bg: "rgba(20,20,20,.4)",
                            },
                            hover: {
                                text: "lgray",
                                bg: "rgba(134,134,134,.24)",
                            }
                        }
                    },
                    selected: ""
                },

                data_3: {
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
                },

                data_4: {
                    props: {
                        dataTree: [
                            {
                                id: "css_2",
                                text: "css",
                                spread: true,
                                tooltip: "<span class='color-red bold'>展示相关 css 样式值</span>",
                                children: [
                                    {
                                        id: "color_2_1",
                                        text: "color 文字颜色",
                                        children: [
                                            {
                                                id: "color_3_1",
                                                text: "red 玫红",
                                                tooltip: "【色值】：#ec4334;"
                                            },
                                            {
                                                id: "color_3_2",
                                                text: "yellow 橙黄"
                                            },
                                        ]
                                    },
                                    {
                                        id: "background_2_2",
                                        text: "background 背景样式",
                                        tooltip: "<span class='color-blue bold'>【exp】</span>：background: red;"
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
                        },
                        tooltipData: {
                            colors: {
                                text: "#ddd",
                                bg: "dgray",
                                line: "dark",
                                point: "blue"
                            },
                            offset: {
                                x: -40,
                                y: -70
                            }
                        }
                    }
                },

            }
        },
        methods: {

            $_select_1(id){
                this.data_1.selected = id;
            },

            $_select_2(id){
                this.data_2.selected = id;
            },

            //数据选择
            $_select_3(ids){
                this.data_3.selected = ids;
            }

        }
    }
</script>