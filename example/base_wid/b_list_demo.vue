<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>长内容通常使用 <code>b-list</code> 组件进行封装，通过 <code>scroll</code> 属性可以设置溢出滚动及隐藏效果。</p>
            <div class="resize grid color-mgray">
                <div class="col-6 pad-r-3 line-r thick-1 line-lgray pad-r-d5-s">
                    <b-list scroll="hide" styles="h-10 bg-color-lgray">
                        <div class="bg-color-dgray pad-2">
                            <h5>溢出隐藏</h5>
                            <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                            <div class="pright alpha-d5">—— btxstudio</div>
                        </div>
                    </b-list>
                </div>
                <div class="col-6 pad-l-3 pad-l-d5-s">
                    <b-list scroll="y" styles="h-10 bg-color-lgray">
                        <div class="bg-color-dgray pad-2">
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

        <!--横向滚动条-->
        <section>
            <h5>横向滚动条</h5>
            <p>通过 <code>scroll</code> 属性设置为 <b>x</b>，可以实现内容的水平溢出滚动。</p>
            <div class="resize bg-color-dgray pad-v-1 pad-h-2 round-sm">
                <b-list v-bind="data2.props" @on_scroll="$_scroll2">
                    <h5 class="color-mgray">横向滚动条</h5>
                    <div class="flex pad-b-1d5 color-light">
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">html</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">css</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">javascript</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">vue</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">react</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">typescript</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">C++</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">php</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">python</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2 mrg-r-1">ruby</span>
                        <span class="bg-color-neutral line line-neutral thick-1 round-lg pad-v-d5 pad-h-2">linux</span>
                    </div>
                </b-list>
            </div>
            <p>
                滚动方向：
                <code v-if="data2.move_dir">{{data2.move_dir}}</code>
                <span v-else class="alpha-d7">暂无滚动</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--宽滚动条-->
        <section>
            <h5>宽滚动条</h5>
            <p>通过 <code>wide</code> 属性可以设置加宽滚动条，易于拖动。</p>
            <div class="resize color-mgray">
                <b-list scroll="y" :wide="true" styles="h-15 bg-color-lgray">
                    <div class="bg-color-dgray pad-2">
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
            <p>滚动过程中，通过 <code>on_scroll</code> API 可以监听滚动方向及定位；<code>on_to_top</code>、<code>on_to_bottom</code> 可以监听滚动条滚动置顶及置底状态。</p>
            <div class="resize color-mgray">
                <b-list v-bind="data4.props"
                        @on_to_top="$_scroll_to_top"
                        @on_to_bottom="$_scroll_to_bottom"
                        @on_scroll="$_scroll4"
                        styles="h-15 bg-color-lgray">
                    <div class="bg-color-dgray pad-2">
                        <h5>滚动监听</h5>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p class="pright alpha-d5 mrg-t-6">—— btxstudio</p>
                    </div>
                </b-list>
            </div>
            <p>
                滚动方向及定位：
                <code v-if="data4.scroll_info">{{data4.scroll_info}}</code>
                <span v-else class="alpha-d7">暂无滚动</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--响应式置顶按钮-->
        <section>
            <h5>响应式置顶按钮</h5>
            <p>通过 <code>goTopBtn</code> 属性可配置置顶按钮的显示状态及样式，其中 <b>colors</b> 字段可设置按钮色彩方案；<b>pos</b> 字段可设置按钮定位；<b>response_direction</b> 字段可设置按钮基于滑动方向响应式显示；<b>show_distance</b> 字段可设置按钮显示时距离视口顶部的距离，默认为 false 不显示。</p>
            <div class="resize color-mgray">
                <b-list v-bind="data5.props"
                        styles="h-15 bg-color-lgray">
                    <div class="bg-color-dgray pad-2">
                        <h5>响应式置顶按钮</h5>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p>When it comes to a secure website and passwords.</p>
                        <p>it is all in your hands to create a password.</p>
                        <p>that a hacker simply cannot crack.</p>
                        <p class="pright alpha-d5 mrg-t-4">—— btxstudio</p>
                    </div>
                </b-list>
            </div>
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

                data2: {
                    props: {
                        scroll: "x"
                    },
                    move_dir: ""
                },

                data4: {
                    props: {
                        scroll: "y",
                        wide: true
                    },
                    scroll_info: "",
                },

                data5: {
                    props: {
                        goTopBtn: {
                            show_distance: "1scr",
                            response_direction: true,
                            pos: {
                                right: "1",
                                bottom: "1"
                            }
                        }
                    }
                },

            }
        },
        methods: {

            $_scroll2(scroll){
                let result;
                switch(scroll.dir){
                    case "l2r": result = "从左向右滑动";
                        break;
                    case "r2l": result = "从右向左滑动";
                        break;
                    case "t2b": result = "由上往下滑动";
                        break;
                    case "b2t": result = "由下往上滑动";
                }
                this.data2.move_dir = result;
            },

            $_scroll4(scroll){
                let result;
                switch(scroll.dir){
                    case "l2r": result = `从左向右滑动，距离左侧：${scroll.left} px`;
                        break;
                    case "r2l": result = `从右向左滑动，距离左侧：${scroll.left} px`;
                        break;
                    case "t2b": result = `由上往下滑动，距离顶部：${scroll.top} px`;
                        break;
                    case "b2t": result = `由下往上滑动，距离顶部：${scroll.top} px`;
                }
                this.data4.scroll_info = result;
            },

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