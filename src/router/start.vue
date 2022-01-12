<template>
    <article>
        <p>官方指南假设你已了解关于 HTML、CSS、JavaScript 以及 vue2.0 的中级知识。尝试 BTX·UI 最直观的的方法是快速搭建一个静态网页，跟着例子学习一些基础用法。可以使用标准的 html 标签通过全局样式实现，也可以通过框架提供的 webapp 组件库来进行布局。</p>
        <p>首先应该引入全局样式库（此处不考虑响应式布局）：</p>
        <p><b>普通 html 网页引入全局样式基础适配版：</b></p>
        <p><code>&lt;link rel="stylesheet" src="http://www.75sea.com/cdn/css/v2/btx.min.css"&gt;&lt;/script&gt;</code></p>
        <p><b>webapp 引入基础样式初始化库：</b></p>
        <p><code>&lt;link rel="stylesheet" src="http://www.75sea.com/cdn/css/v2/btx.webapp.min"&gt;&lt;/script&gt;</code></p>
        <p><b>如果是开发 webapp，那么接下来可以通过 npm 安装组件库：</b></p>
        <p><code>$ npm install btx-ui -S</code></P>
        <p>所有准备工作都已经完成了，接下来就可以使用 BTX·UI 提供的组件来快速创建一个网页了。</p>
        <p></p>

        <!--静态网站示例代码-->
        <section>
            <h5>静态网站示例代码</h5>
            <div ref="code_container" :class="`no-scroll line line-dgray thick-1 round-sm round-t bg-color-dgray h-${site_code_spread? 'auto': '40'}`">
                <pre :style="{width: code_area_width}" v-highlightjs><code class="javascript" v-html="site_code"></code></pre>
            </div>
            <b-hot styles="flex-5 line line-neutral shadow thick-1 color-neutral round-md round-b"
                   hover="bg-color-neutral shadow-no"
                   @on_click="$_toggle_code">
                <span class="color-mgray">{{site_code_spread? "收起": "展开"}}代码</span>
                <span class="mrg-l-1 color-mgray">{{site_code_spread? "-": "+"}}</span>
            </b-hot>
            <p></p>
        </section>

        <!--静态网站示例效果-->
        <section>
            <h5>静态网站示例效果</h5>
            <b-view styles="resize">
                <!--导航-->
                <b-view styles="flex-between bg-color-sub round-sm pad-h-2">
                    <b-icon icon="ui" styles="fsize-2" />
                    <b-view styles="flex-4 fsize-1.2 pad-v-1">
                        <b-hot hover="color-light" @on_click="$_show_nav('Home')">Home</b-hot>
                        <b-hot styles="mrg-l-2" hover="color-light" @on_click="$_show_nav('Service')">Service</b-hot>
                        <b-hot styles="mrg-l-2" hover="color-light" link="http://www.75sea.com">75sea</b-hot>
                    </b-view>
                </b-view>

                <!--主图-->
                <b-view styles="rel">
                    <b-view styles="abs max flex-column flex-5">
                        <b-text styles="color-light fsize-2">BTX·UI Frame</b-text>
                        <b-text styles="color-sub">build by btxstudio 2020.</b-text>
                    </b-view>
                    <b-img :img="require('@/assets/img/banner.jpg')" styles="round-md mrg-t-4px" />
                </b-view>

                <!--栅格均分布局-->
                <b-grid styles="mrg-t-1"
                        :col-data="icons_data"
                        :grid-height="12"
                        :line="['lgray', 1]"
                        outline-color="#fff">
                    <b-view v-for="item of icons_data.items" styles="pad-2 pcenter" :slot="item.id" :key="item.id">
                        <b-icon :icon="item.icon" styles="fsize-2.5 color-sub" />
                        <b-view styles="fsize-1.1">{{item.title}}</b-view>
                        <b-view styles="alpha-.7 fsize-.8">select this {{item.id}}</b-view>
                    </b-view>
                </b-grid>

                <!--栅格不均分布局-->
                <b-grid styles="mrg-t-2 fsize-1.1" :col-data="article_data">
                    <b-img :slot="article_data.items[0].id" :img="require('@/assets/img/banner2.jpg')" styles="round-md" />
                    <b-view :slot="article_data.items[1].id" styles="pad-2 pleft">
                        <b-view styles="fsize-1.7">Javascript with typescript</b-view>
                        <b-view styles="color-sub mrg-b-2">the best language in the world</b-view>
                        <b-view styles="alpha-.7">Whenever you need me， I'll be here。 Whenever you're in trouble， I'm always near。Whenever you feel alone， and you think everyone has given up。Reach out for me， and I will give you my everlasting love。</b-view>
                    </b-view>
                </b-grid>

            </b-view>
        </section>
    </article>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BText from "@/components/BTXUI/core/b-text"
    import BIcon from "@/components/BTXUI/core/b-icon"
    import BImg from "@/components/BTXUI/core/b-img"
    import BHot from "@/components/BTXUI/core/b-hot"
    import BGrid from "@/components/BTXUI/core/b-grid"
    import start_site_code_str from "@/assets/start_site_code_str"

    export default {
        name: "start",
        components: {
            BView,
            BText,
            BIcon,
            BImg,
            BHot,
            BGrid
        },
        data(){
            return {

                //代码区域宽度
                code_area_width: 0,

                //代码文本
                site_code: start_site_code_str.replace(/</g, "&lt;"),

                //代码展开状态
                site_code_spread: false,

                icons_data: {
                    common_plan: "col-3 col-6-s",
                    items: [
                        {
                            id: "A",
                            icon: "mobile",
                            title: "mobile",
                        },
                        {
                            id: "B",
                            icon: "weibo",
                            title: "weibo",
                        },
                        {
                            id: "C",
                            icon: "wechat",
                            title: "wechat",
                        },
                        {
                            id: "D",
                            icon: "bili",
                            title: "bili",
                        },
                        {
                            id: "E",
                            icon: "github",
                            title: "github",
                        },
                        {
                            id: "F",
                            icon: "download",
                            title: "download",
                        },
                        {
                            id: "G",
                            icon: "user",
                            title: "user",
                        },
                        {
                            id: "H",
                            icon: "system",
                            title: "system",
                        },
                    ]
                },

                article_data: {
                    items: [
                        {
                            id: "a",
                            plan: "col-4 col-12-s"
                        },
                        {
                            id: "b",
                            plan: "col-8 col-12-s"
                        },
                    ]
                }

            }
        },
        computed: {

            //代码容器
            $code_container(){
                return this.$refs.code_container;
            }

        },
        methods: {

            //折叠代码
            $_toggle_code(){
                if(this.site_code_spread){
                    this.$code_container.scrollIntoView();
                    this.$code_container.offsetParent.scrollTop -= 10;
                }
                this.site_code_spread = !this.site_code_spread;
            },

            $_show_nav(nav){
                this.$confirm.toast(`当前导航内容：<b class="color-green">${nav}</b>`);
            }

        },
        mounted(){
            this.code_area_width = `${this.$code_container.clientWidth}px`;
        }
    }
</script>