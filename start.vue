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
            <b-view>
                <!--导航-->
                <b-view class="flex-between bg-color-sub round-sm pad-h-2">
                    <b-icon icon="ui" class="fsize-2" />
                    <b-view class="flex-4 fsize-1d2 pad-v-1">
                        <b-hot hover="color-light" @on_click="$_show_nav('Home')">Home</b-hot>
                        <b-hot class="mrg-l-2" hover="color-light" @on_click="$_show_nav('Service')">Service</b-hot>
                        <b-hot class="mrg-l-2" hover="color-light" link="http://www.75sea.com">75sea</b-hot>
                    </b-view>
                </b-view>

                <!--主图-->
                <b-view class="rel">
                    <b-view class="abs max flex-column flex-5">
                        <b-text class="color-light fsize-2">BTX·UI Frame</b-text>
                        <b-text class="color-sub">build by btxstudio 2020.</b-text>
                    </b-view>
                    <b-img img='/banner.jpg' class="round-md mrg-t-4-px" />
                </b-view>

                <!--栅格均分布局-->
                <b-row class="mrg-t-1">
                    <b-col v-for="item of icons_data.items" :span="3"
                        class="h-12 solid line-lgray thick-1 pad-2 pcenter" :key="item.id">
                        <b-icon :icon="item.icon" class="fsize-2d5 color-sub" />
                        <b-view class="fsize-1d1">{{ item.title }}</b-view>
                        <b-view class="alpha-d7 fsize-d8">select this {{ item.id }}</b-view>
                    </b-col>
                </b-row>

                <!--栅格不均分布局-->
                <b-row class="mrg-t-2 fsize-1d1">
                    <b-col :span="4">
                        <b-img :slot="article_data.items[0].id" img='@/assets/img/banner2.jpg' styles="round-md" />
                    </b-col>
                    <b-col :span="8" class="pad-2 pleft">
                        <b-view class="fsize-1d7">Javascript with typescript</b-view>
                        <b-view class="color-sub mrg-b-2">the best language in the world</b-view>
                        <b-view class="alpha-d7">Whenever you need me， I'll be here。 Whenever you're in trouble， I'm always near。Whenever you feel alone， and you think everyone has given up。Reach out for me， and I will give you my everlasting love。</b-view>
                    </b-col>
                </b-row>
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
    import BRow from "@/components/BTXUI/core/b-grid/b-row"
    import BCol from "@/components/BTXUI/core/b-grid/b-col"
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