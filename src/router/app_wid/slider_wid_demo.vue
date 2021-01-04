<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>pages</code> 属性配置好页面数据，再通过插槽形式插入对应页面内容即可使用。<code>view</code> 属性可以设置页面高度及背景色。<code>showDot</code> 属性可以显示轮播点（轮播点支持点击分页）。<code>showFlipBtn</code> 属性则可以显示默认分页按钮。<code>autoPlayDuration</code> 属性可以设置自动播放时间间隔（单位毫秒）。<code>loop</code> 属性可以设置是否循环播放。<code>keyboardFlip</code> 属性可以启动键盘左右分页功能（注：同一页面仅限单个实例使用）。</p>
            <div class="resize">
                <slider-wid v-bind="data_1">
                    <div v-for="page of data_1.pages" :key="page.id" :slot="page.id"
                         class="pad-t-4 pcenter fsize-1d4 alpha-d7" v-html="page.text">
                    </div>
                </slider-wid>
            </div>
            <hr>
            <p></p>
        </section>

        <!--外部操作-->
        <section>
            <h5>外部操作</h5>
            <p>通过 <code>next、prev、flip</code> API 方法可以实现组件的外部分页操作，当 <b>flip_ani</b> 参数为 false 时则为硬切换。<code>auto_play、stop_auto_play</code> 方法则可以控制自动播放效果。通过 <code>on_flip</code> 事件可以在回调函数中获取当前分页页码 <b>cur_page</b>。</p>
            <div class="resize">
                <slider-wid v-bind="data_2.props" ref="slider2" @on_flip="$_show_page2">
                    <div v-for="page of data_2.props.pages" :key="page.id" :slot="page.id"
                         class="pad-t-4 pcenter fsize-1d4 alpha-d7" v-html="page.text">
                    </div>
                </slider-wid>
                <div class="flex-between w-40 mrg-v-1">
                    <btn-wid btnText="Prev" @on_click="$_prev2" />
                    <btn-wid btnText="Next" @on_click="$_next2" />
                    <btn-wid btnText="Page 3" @on_click="$_flip2(3)" />
                    <btn-wid btnText="停止自动播放" @on_click="$_stop2" />
                    <btn-wid btnText="继续自动播放" @on_click="$_play2" />
                </div>
                <div>当前页码：<code>{{data_2.cur_page}}</code></div>
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import SliderWid from "@/components/BTXUI/slider/slider-wid"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"

    export default {
        name: "slider_wid_demo",
        components: {
            HeaderInfo,
            SliderWid,
            BtnWid
        },
        data(){
            const pages = [
                { id: "a", text: "javascript" },
                { id: "b", text: "css<br>Cascading Style Sheets<br>层叠样式表" },
                { id: "c", text: "php" }
            ];

            return {

                //初始化入参
                header_info: {
                    name: SliderWid.name,
                    ...SliderWid.introduce,
                },

                data_1: {
                    pages,
                    view: {
                        height: 17,
                        bg_color: "lgray"
                    },
                    showDot: {
                        bottom: 2,
                        color: "yellow",
                        act_color: "blue"
                    },
                    showFlipBtn: true,
                    autoPlayDuration: 3000,
                    loop: true,
                    keyboardFlip: true
                },

                data_2: {
                    props: {
                        pages,
                        view: {
                            height: 17,
                            bg_color: "lgray"
                        },
                        showDot: {
                            bottom: 2,
                            color: "yellow",
                            act_color: "blue"
                        },
                        autoPlayDuration: 3000,
                        loop: true
                    },
                    cur_page: 1
                },

            }
        },
        computed: {

            slider2(){
                return this.$refs.slider2;
            }

        },
        methods: {

            $_prev2(){
                this.slider2.prev();
            },

            $_next2(){
                this.slider2.next(false); //硬切换
            },

            $_flip2(page){
                this.slider2.flip(3, false); //硬切换
            },

            $_show_page2(page){
                this.data_2.cur_page = page;
            },

            $_stop2(){
                this.slider2.stop_auto_play();
            },

            $_play2(){
                this.slider2.auto_play();
            }

        }
    }
</script>