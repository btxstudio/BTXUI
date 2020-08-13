<template>
    <article>
        <h5><code>content-widget</code></h5>
        <p>该组件用于处理树形结构数据的可视化及交互操作。</p>
        <p>组件依赖：<code>content-node-widget</code>、<code>tooltip-widget</code></p>
        <p>组件初始化入参：</p>
        <p></p>

        <h5>组件 API：</h5>
        <table class="table">
            <thead>
            <tr>
                <th>事件</th>
                <th>触发</th>
                <th>参数</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <code>on_select</code>
                </td>
                <td>执行数据项点选</td>
                <td>复选数据结构：</td>
            </tr>
            </tbody>
        </table>
        <table class="table">
            <thead>
            <tr>
                <th>方法</th>
                <th>参数</th>
                <th>效果</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <code>clear_selected</code>
                </td>
                <td>-</td>
                <td>清空所选数据</td>
            </tr>
            </tbody>
        </table>
        <p></p>

        <h5>基础渲染</h5>
        <p>组件初始化数据会将树形结构数据转换为平级索引结构数据（indexed_data），以便于后续的快速选取操作；通过数据字段 <code>spread</code> 可以默认展开子级；通过数据字段 <code>spread_fixed</code> 可以强制展开子级，禁止收起。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <content-widget :data-tree="dataTree_1" />
        </div>
        <p></p>

        <h5>富文本样式</h5>
        <p>数据字段 <code>text</code> 支持富文本以实现自定义样式扩展。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <content-widget :data-tree="dataTree_2" />
        </div>
        <p></p>

        <h5>复选操作</h5>
        <p>组件默认提供复选模式，可通过数据字段 <code>checkbox</code> 启用复选框；通过响应式数据字段 <code>selected</code> 切换勾选样式状态，也可用于初始化默认选择数据。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <content-widget :data-tree="dataTree_3.data" @on_select="$_select_3" />
        </div>
        <p>当前所选数据：</p>
        <p><code>{{dataTree_3.selected}}</code></p>
        <p></p>
    </article>
</template>

<script>
    import ContentWidget from "@/components/BTXUI/content/content-widget"

    export default {
        name: "content_widget_demo",
        components: { ContentWidget },
        data(){
            return {

                //基础渲染数据
                dataTree_1: [
                    {
                        id: "html_1",
                        text: "html",
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
                ],

                //基础渲染数据
                dataTree_2: [
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
                                text: "color <span style='color: blue'>文字颜色</span>",
                            },
                            {
                                id: "background_2_2",
                                text: "<b style='color: #02b9a1'>background</b> 背景样式",
                            },
                        ]
                    }
                ],

                //复选操作数据
                dataTree_3: {
                    data: [
                        {
                            id: "html_1",
                            text: "html",
                            checkbox: true,
                            children: [
                                {
                                    id: "div_1_1",
                                    text: "div 标签",
                                    checkbox: true
                                },
                                {
                                    id: "span_1_2",
                                    text: "span 标签",
                                    checkbox: true
                                },
                                {
                                    id: "a_1_3",
                                    text: "a 标签",
                                    checkbox: true
                                },
                            ]
                        },
                        {
                            id: "css_2",
                            text: "css",
                            spread_fixed: true,
                            children: [
                                {
                                    id: "color_2_1",
                                    text: "color 文字颜色",
                                    selected: true,
                                    checkbox: true
                                },
                                {
                                    id: "background_2_2",
                                    text: "background 背景样式",
                                    selected: true,
                                    checkbox: true
                                },
                            ]
                        },
                        {
                            id: "javascript_3",
                            text: "javascript"
                        },
                    ],
                    selected: []
                },

            }
        },
        methods: {

            //数据选择
            $_select_3(data){
                console.log(data);
                this.dataTree_3.selected = data;
            }

        }
    }
</script>