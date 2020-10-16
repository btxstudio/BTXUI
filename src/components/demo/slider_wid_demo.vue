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
                         class="pad-t-6 pcenter fsize-1d4 alpha-d7">
                        {{page.text}}
                    </div>
                </slider-wid>
            </div>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import SliderWid from "@/components/BTXUI/slider/slider-wid"

    export default {
        name: "slider_wid_demo",
        components: {
            HeaderInfo,
            SliderWid
        },
        data(){
            const pages = [
                { id: "a", text: "html + css" },
                { id: "b", text: "javascript" },
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
                }

            }
        }
    }
</script>