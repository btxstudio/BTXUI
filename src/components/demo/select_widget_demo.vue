<template>
    <article>
        <header-info v-bind="header_info" />

        <section>
            <h5>基础下拉框</h5>
            <p>通过 <code>placeholder</code> 属性可以设置提示文字。</p>
            <div class="resize w-15">
                <select-widget v-bind="data_1.props" v-model="data_1.selected" />
            </div>
            <p>所选项：
                <code v-if="data_1.selected.text">{{data_1.selected.text}}</code>
                <span v-else class="alpha-d5">暂无选择</span>
            </p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>默认下拉项</h5>
            <div class="resize w-15">
                <select-widget v-bind="data_2.props" v-model="data_2.selected" />
            </div>
            <p>所选项：<code>{{data_2.selected.text}}</code></p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>下拉选项最大显示行数</h5>
            <p>通过 <code>rows</code> 属性可以设置下拉选项最大显示行数。当总数据项不足最大行数时会保持默认行数。</p>
            <div class="resize flex">
                <div class="w-15">
                    <select-widget v-bind="data_3.props1" v-model="data_3.selected1" />
                </div>
                <div class="w-15 mrg-l-2">
                    <select-widget v-bind="data_3.props2" v-model="data_3.selected2" />
                </div>
            </div>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import SelectWidget from "@/components/BTXUI/select/select-widget"

    export default {
        name: "select_widget_demo",
        components: {
            HeaderInfo,
            SelectWidget
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: SelectWidget.name,
                    ...SelectWidget.introduce,
                },

                //基础渲染数据1
                data_1: {
                    props: {
                        listData: [
                            {
                                text: "html + css",
                                val: "html&css",
                            },
                            {
                                text: "javascript",
                                val: "js",
                            }
                        ],
                        placeholder: "请选择相关技术"
                    },
                    selected: {}
                },

                //基础渲染数据2
                data_2: {
                    props: {
                        listData: [
                            {
                                text: "html + css",
                                val: "html&css",
                            },
                            {
                                text: "javascript",
                                val: "js",
                            },
                            {
                                text: "vue3.0",
                                val: "vue",
                            }
                        ],
                        placeholder: "请选择相关技术"
                    },
                    selected: {
                        val: "js",
                        text: "javascript"
                    }
                },

                //基础渲染数据3
                data_3: {
                    props1: {
                        listData: [
                            {
                                text: "html + css",
                                val: "html&css",
                            },
                            {
                                text: "javascript",
                                val: "js",
                            },
                            {
                                text: "vue",
                                val: "vue",
                            },
                            {
                                text: "react",
                                val: "react",
                            },
                            {
                                text: "nodejs",
                                val: "nodejs",
                            },
                            {
                                text: "webpack",
                                val: "webpack",
                            },
                            {
                                text: "typescript",
                                val: "typescript",
                            },
                            {
                                text: "php",
                                val: "php",
                            },
                            {
                                text: "c#",
                                val: "c#",
                            }
                        ],
                        rows: 3,
                        placeholder: "请选择相关技术"
                    },
                    props2: {
                        listData: [
                            {
                                text: "html + css",
                                val: "html&css",
                            }
                        ],
                        rows: 3,
                        placeholder: "请选择相关技术"
                    },
                    selected1: {
                        val: "php",
                        text: "php"
                    },
                    selected2: {}
                },

            }
        }
    }
</script>