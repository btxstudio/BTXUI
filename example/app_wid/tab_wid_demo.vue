<template>
    <article>
        <header-info v-bind="header_info" />

        <!--选项卡切换使用-->
        <section>
            <h5>选项卡切换使用</h5>
            <p>通过 v-model 绑定响应式数据。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tab-wid v-bind="data_1.props" v-model="data_1.cur_tab">
                    <div class="h-10 bg-color-light round-b round-sm shadow-sm color-neutral pad-2" :slot="item.id" v-for="item of data_1.props.tagsData.tagList" :key="item.id">
                        <span class="color-mgray">{{data_1.content[item.id]}}</span>
                    </div>
                </tab-wid>
            </div>
            <p>当前所选数据：<code>{{data_1.cur_tab}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--自定义颜色方案-->
        <section>
            <h5>自定义颜色方案</h5>
            <p>通过 <code>colors</code> 字段可以配置标签色彩体系。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tab-wid v-bind="data_2.props" v-model="data_2.cur_tab">
                    <div class="h-10 bg-color-light round-b round-sm shadow-sm color-neutral pad-2" :slot="item.id" v-for="item of data_2.props.tagsData.tagList" :key="item.id">
                        <span class="color-mgray">{{data_2.content[item.id]}}</span>
                    </div>
                </tab-wid>
            </div>
            <hr>
            <p></p>
        </section>

        <!--滑动切换-->
        <section>
            <h5>滑动切换</h5>
            <p>通过 <code>smooth</code> 字段可以设置内容滑动切换效果。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tab-wid v-bind="data_3.props" v-model="data_3.cur_tab">
                    <div class="h-10 bg-color-light round-b round-sm shadow-sm color-neutral pad-2" :slot="item.id" v-for="item of data_3.props.tagsData.tagList" :key="item.id">
                        <span class="color-mgray">{{data_3.content[item.id]}}</span>
                    </div>
                </tab-wid>
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import TabWid from "@/components/BTXUI/tab/tab-wid"

    export default {
        name: "tab_wid_demo",
        components: {
            HeaderInfo,
            TabWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: TabWid.name,
                    ...TabWid.introduce,
                },

                data_1: {
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
                    cur_tab: "html",
                    content: {
                        html: "html 是用于网页布局的标记语言",
                        css: "css 是用于网页样式的语言",
                        javascript: "javascript 是用于网页交互行为的脚本语言"
                    }
                },

                data_2: {
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

                data_3: {
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
                            ]
                        },
                        smooth: true
                    },
                    cur_tab: "css",
                    content: {
                        html: "html 是用于网页布局的标记语言",
                        css: "css 是用于网页样式的语言",
                        javascript: "javascript 是用于网页交互行为的脚本语言"
                    }
                }

            }
        }
    }
</script>