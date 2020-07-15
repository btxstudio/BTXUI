<template>
    <article>
        <h5><code>tab-widget</code></h5>
        <p>该组件用于进行标签切换交互操作。</p>
        <p>组件依赖：无</p>
        <p>组件初始化入参：</p>
        <p></p>

        <h5>选项卡切换使用</h5>
        <p>通过 v-model 绑定响应式数据。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <tab-widget :tab-list="dataList_1.data" v-model="dataList_1.cur_tab">
                <div class="h-10 bg-color-light round-b round-sm shadow-sm color-neutral pad-2" :slot="item.id" v-for="item of dataList_1.data" :key="item.id">
                    <span class="color-mgray">{{dataList_1.content[item.id]}}</span>
                </div>
            </tab-widget>
        </div>
        <p>当前所选数据：<code>{{dataList_1.cur_tab}}</code></p>
        <p></p>
    </article>
</template>

<script>
    import TabWidget from "@/components/BTXUI/tab-widget/tab-widget"

    export default {
        name: "tab_widget_demo",
        components: { TabWidget },
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