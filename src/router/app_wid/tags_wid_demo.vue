<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础单选使用-->
        <section>
            <h5>基础单选使用</h5>
            <p>通过 v-model 绑定响应式数据。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tags-wid v-bind="data_1.props" v-model="data_1.selected" />
            </div>
            <p>当前所选数据：<code v-for="id of data_1.selected">{{id}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--复选使用-->
        <section>
            <h5>复选使用</h5>
            <p>数据属性 <code>mode="checkbox"</code> 可以设置复选框操作。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tags-wid v-bind="data_2.props" v-model="data_2.selected" />
            </div>
            <p>当前所选数据：<code v-for="id of data_2.selected">{{id}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--自定义配色-->
        <section>
            <h5>自定义配色</h5>
            <p>通过 <code>colors</code> 属性可以自定义色彩方案。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tags-wid v-bind="data3.props" v-model="data3.selected" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import TagsWid from "@/components/BTXUI/tags/tags-wid"

    export default {
        name: "tags_wid_demo",
        components: {
            HeaderInfo,
            TagsWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: TagsWid.name,
                    ...TagsWid.introduce,
                },

                //基础渲染数据1
                data_1: {
                    props: {
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
                    selected: []
                },

                //基础渲染数据2
                data_2: {
                    props: {
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
                        mode: "checkbox"
                    },
                    selected: []
                },

                //数据3
                data3: {
                    props: {
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
                            act: {
                                text: "main",
                                bg: "sub",
                            },
                            hover: {
                                text: "sub",
                                bg: "dark",
                            },
                        }
                    },
                    selected: [],
                },

            }
        },
        methods: {
        }
    }
</script>