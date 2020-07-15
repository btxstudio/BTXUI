<template>
    <article>
        <h5><code>tag-widget</code></h5>
        <p>该组件用于进行标签切换交互操作。</p>
        <p>组件依赖：无</p>
        <p>组件初始化入参：</p>
        <p></p>

        <h5>基础单选使用</h5>
        <p>通过 v-model 绑定响应式数据。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <tag-widget :data-list="dataList_1.data" v-model="dataList_1.selected" />
        </div>
        <p>当前所选数据：<code v-for="id of dataList_1.selected">{{id}}</code></p>
        <p></p>

        <h5>复选使用</h5>
        <p>数据属性 <code>mode="checkbox"</code> 可以设置复选框操作。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <tag-widget :data-list="dataList_2.data" v-model="dataList_2.selected" mode="checkbox" />
        </div>
        <p>当前所选数据：<code v-for="id of dataList_2.selected">{{id}}</code></p>
        <p></p>

    </article>
</template>

<script>
    import TagWidget from "@/components/BTXUI/tag-widget/tag-widget"

    export default {
        name: "tag_widget_demo",
        components: { TagWidget },
        data(){
            return {

                //基础渲染数据
                dataList_1: {
                    data: [
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
                    selected: []
                },

                //基础渲染数据
                dataList_2: {
                    data: [
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
                    selected: []
                },

            }
        },
        methods: {
        }
    }
</script>