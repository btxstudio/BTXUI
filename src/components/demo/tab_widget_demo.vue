<template>
    <article>
        <header-info v-bind="header_info" />

        <section>
            <h5>选项卡切换使用</h5>
            <p>通过 v-model 绑定响应式数据。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tab-widget v-bind="dataList_1.props" v-model="dataList_1.cur_tab">
                    <div class="h-10 bg-color-light round-b round-sm shadow-sm color-neutral pad-2" :slot="item.id" v-for="item of dataList_1.props.tagsData.tagList" :key="item.id">
                        <span class="color-mgray">{{dataList_1.content[item.id]}}</span>
                    </div>
                </tab-widget>
            </div>
            <p>当前所选数据：<code>{{dataList_1.cur_tab}}</code></p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>自定义颜色方案</h5>
            <p>通过 <code>colors</code> 字段可以配置标签色彩体系。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tab-widget v-bind="dataList_2.props" v-model="dataList_2.cur_tab">
                    <div class="h-10 bg-color-light round-b round-sm shadow-sm color-neutral pad-2" :slot="item.id" v-for="item of dataList_2.props.tagsData.tagList" :key="item.id">
                        <span class="color-mgray">{{dataList_2.content[item.id]}}</span>
                    </div>
                </tab-widget>
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import TabWidget from "@/components/BTXUI/tab/tab-widget"

    export default {
        name: "tab_widget_demo",
        components: {
            HeaderInfo,
            TabWidget
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: TabWidget.name,
                    ...TabWidget.introduce,
                },

                //基础渲染数据1
                dataList_1: {
                    props: {
                        tagsData: {
                            tagList: [
                                {
                                    id: "html",
                                    text: "html"
                                },
                                {
                                    id: "css",
                                    text: "css"
                                },
                                {
                                    id: "javascript",
                                    text: "javascript"
                                },
                            ],
                        }
                    },
                    cur_tab: "css",
                    content: {
                        html: "html 是用于网页布局的标记语言",
                        css: "css 是用于网页样式的语言",
                        javascript: "javascript 是用于网页交互行为的脚本语言"
                    }
                },

                //基础渲染数据2
                dataList_2: {
                    props: {
                        tagsData: {
                            tagList: [
                                {
                                    id: "html",
                                    text: "html"
                                },
                                {
                                    id: "css",
                                    text: "css"
                                },
                                {
                                    id: "javascript",
                                    text: "javascript"
                                },
                            ],
                            colors: {
                                normal: {
                                    text: "light",
                                    bg: "#444",
                                },
                                hover: {
                                    text: "mgray",
                                    bg: "#333",
                                },
                                act: {
                                    text: "blue",
                                    bg: "light",
                                },
                            }
                        }
                    },
                    cur_tab: "css",
                    content: {
                        html: "html 是用于网页布局的标记语言",
                        css: "css 是用于网页样式的语言",
                        javascript: "javascript 是用于网页交互行为的脚本语言"
                    }
                },

            }
        },
        methods: {
        }
    }
</script>