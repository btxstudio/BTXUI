<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>组件会基于 <code>total</code> 总页数、<code>curPage</code> 当前页、<code>limit</code> 页码显示限制属性，自动进行分页导航布局。</p>
            <p>通过 API <code>on_flip</code> 事件则可以获取当前页码。</p>
            <p>【exp】total: 8、curPage: 2、limit: 3 demo 效果：</p>
            <div class="resize bg-color-lgray pad-1 round-sm">
                <page-flip-wid v-bind="data_1.props" @on_flip="$_show_page1" />
            </div>
            <p>当前页码：<code>{{data_1.cur_page}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--风格化-->
        <section>
            <h5>风格化</h5>
            <p>组件 <code>colors</code> 属性可设置组件按钮风格化样式。</p>
            <div class="resize bg-color-dark pad-1 round-sm">
                <page-flip-wid v-bind="data_2.props" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--水平对齐-->
        <section>
            <h5>水平对齐</h5>
            <p>组件 <code>align</code> 属性可设置组件水平对齐方式，包括：left、center（默认）、right。</p>
            <div class="resize bg-color-lgray pad-1 round-sm">
                <page-flip-wid v-bind="data_3.props" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import PageFlipWid from "@/components/BTXUI/pageFlip/page-flip-wid"

    export default {
        name: "range_wid_demo",
        components: {
            HeaderInfo,
            PageFlipWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: PageFlipWid.name,
                    ...PageFlipWid.introduce,
                },

                data_1: {
                    props: {
                        total: 8,
                        curPage: 2,
                        limit: 3
                    },
                    cur_page: 2
                },

                data_2: {
                    props: {
                        total: 4,
                        colors: {
                            bg: "blue",
                            text: "#fff",
                            hover: "green",
                            act: "green"
                        }
                    }
                },

                data_3: {
                    props: {
                        total: 4,
                        align: "left"
                    }
                },

            }
        },
        methods: {

            $_show_page1(page){
                this.data_1.cur_page = page;
            }

        }
    }
</script>