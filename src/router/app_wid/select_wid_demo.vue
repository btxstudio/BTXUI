<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础下拉框-->
        <section>
            <h5>基础下拉框</h5>
            <p>通过 <code>placeholder</code> 属性可以设置提示文字。</p>
            <div class="resize w-15">
                <select-wid v-bind="data_1.props" v-model="data_1.selected" />
            </div>
            <p>所选项：
                <code v-if="data_1.selected">{{data_1.selected}}</code>
                <span v-else class="alpha-d5">暂无选择</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--默认下拉项-->
        <section>
            <h5>默认下拉项</h5>
            <p>通过 <code>v-model</code> 可以初始化及双向绑定下拉所选项。</p>
            <div class="resize w-15">
                <select-wid v-bind="data_2.props" v-model="data_2.selected" />
            </div>
            <p>所选项：<code>{{data_2.selected}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--下拉选项最大显示行数-->
        <section>
            <h5>下拉选项最大显示行数</h5>
            <p>通过 <code>rows</code> 属性可以设置下拉选项最大显示行数。当总数据项不足最大行数时会保持默认行数。</p>
            <div class="resize flex">
                <div class="w-15">
                    <select-wid v-bind="data_3.props1" v-model="data_3.selected1" />
                </div>
                <div class="w-15 mrg-l-2">
                    <select-wid v-bind="data_3.props2" v-model="data_3.selected2" />
                </div>
            </div>
            <hr>
            <p></p>
        </section>

        <!--自定义颜色-->
        <section>
            <h5>自定义颜色</h5>
            <p>通过 <code>colors</code> 属性可以设置下拉列表的背景及文字颜色。</p>
            <div class="resize flex">
                <div class="w-15">
                    <select-wid v-bind="data_4.props" v-model="data_4.selected" />
                </div>
            </div>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import SelectWid from "@/components/BTXUI/select/select-wid"

    export default {
        name: "select_wid_demo",
        components: {
            HeaderInfo,
            SelectWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: SelectWid.name,
                    ...SelectWid.introduce,
                },

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
                    selected: ""
                },

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
                    selected: "js"
                },

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
                    selected1: "php",
                    selected2: ""
                },

                data_4: {
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
                                text: "php",
                                val: "php",
                            }
                        ],
                        rows: 3,
                        placeholder: "请选择相关技术",
                        colors: {
                            text: "blue",
                            normal: {
                                text: "sub",
                                bg: "dgray"
                            },
                            hover: {
                                text: "sub",
                                bg: "dark"
                            },
                            act: {
                                text: "dark",
                                bg: "sub"
                            }
                        }
                    },
                    selected: ""
                }

            }
        }
    }
</script>