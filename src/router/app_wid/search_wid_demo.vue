<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础搜索框-->
        <section>
            <h5>基础搜索框</h5>
            <div class="resize flex">
                <search-wid @on_search="(val)=>{data_1.val = val}" />
            </div>
            <p>搜索内容：<code>{{data_1.val}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--样式化搜索框-->
        <section>
            <h5>样式化搜索框</h5>
            <p>通过 <code>notic</code> 属性可以设置文本框提示内容；<code>colors</code> 属性可以设置搜索框色彩风格；而 <code>icon</code> 属性则可以设置图标显示位置。</p>
            <div class="resize flex">
                <search-wid v-bind="data_2" @on_search="(val)=>{data_2.val = val}" />
            </div>
            <p>搜索内容：<code>{{data_2.val}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--搜索提示-->
        <section>
            <h5>搜索提示</h5>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import SearchWid from "@/components/BTXUI/search/search-wid"

    export default {
        name: "search_wid_demo",
        components: {
            HeaderInfo,
            SearchWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: SearchWid.name,
                    ...SearchWid.introduce,
                },

                data_1: {
                    val: "暂无内容"
                },

                data_2: {
                    notic: "请输入您的姓名",
                    icon: "right",
                    colors: {
                        text: "light",
                        bg: "dgray",
                        line: "dark"
                    },
                    val: "暂无内容"
                },

            }
        },
        methods: {
        }
    }
</script>