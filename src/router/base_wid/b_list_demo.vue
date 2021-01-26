<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>长内容通常使用 <code>b-list</code> 组件进行封装，通过 <code>scroll</code> 属性可以设置溢出滚动及隐藏效果。</p>
            <div class="resize grid color-mgray">
                <div class="col-6 pad-r-3 line-r thick-1 line-lgray">
                    <b-list scroll="hide" styles="h-10 bg-color-lgray">
                        <div class="bg-color-dgray pad-2 round-sm round-b">
                            <h5>溢出隐藏</h5>
                            <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                            <div class="pright alpha-d5">—— btxstudio</div>
                        </div>
                    </b-list>
                </div>
                <div class="col-6 pad-l-3">
                    <b-list scroll="y" styles="h-10 bg-color-lgray">
                        <div class="bg-color-dgray pad-2 round-sm round-b">
                            <h5>溢出滚动</h5>
                            <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                            <div class="pright alpha-d5">—— btxstudio</div>
                        </div>
                    </b-list>
                </div>
            </div>
            <hr>
            <p></p>
        </section>

        <!--宽滚动条-->
        <section>
            <h5>宽滚动条</h5>
            <p>通过 <code>wide</code> 属性可以设置加宽滚动条，易于拖动。</p>
            <div class="resize color-mgray">
                <b-list scroll="y" :wide="true" styles="h-15 bg-color-lgray">
                    <div class="bg-color-dgray pad-2 round-sm round-b">
                        <h5>宽滚动条</h5>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p class="pright alpha-d5 mrg-t-6">—— btxstudio</p>
                    </div>
                </b-list>
            </div>
            <hr>
            <p></p>
        </section>

        <!--滚动置顶、置底监听-->
        <section>
            <h5>滚动置顶、置底监听</h5>
            <p>开启 <code>watchPos</code> 滚动位置监听属性时，通过 <code>on_to_top</code>、<code>on_to_bottom</code> API 可以监听滚动条滚动置顶及置底状态。</p>
            <div class="resize color-mgray">
                <b-list scroll="y"
                        :wide="true"
                        :watch-pos="true"
                        @on_to_top="$_scroll_to_top"
                        @on_to_bottom="$_scroll_to_bottom"
                        styles="h-15 bg-color-lgray">
                    <div class="bg-color-dgray pad-2 round-sm round-b">
                        <h5>滚动监听</h5>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p class="pright alpha-d5 mrg-t-6">—— btxstudio</p>
                    </div>
                </b-list>
            </div>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BList from "@/components/BTXUI/core/b-list"

    export default {
        name: "b_list_demo",
        components: {
            HeaderInfo,
            BList
        },
        data() {
            return {

                //初始化入参
                header_info: {
                    name: BList.name,
                    ...BList.introduce,
                },
            }
        },
        methods: {

            //滚动置顶
            $_scroll_to_top(){
                this.$confirm.toast("滚动置顶了！");
            },

            //滚动置底
            $_scroll_to_bottom(){
                this.$confirm.toast("滚动到底了！");
            },

        }
    }
</script>