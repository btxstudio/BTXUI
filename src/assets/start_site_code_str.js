export default
`<template>
    <b-view>
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
</template>

<script>
    export default {
        name: "web_site",
        data(){
            return {
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
        methods: {
            $_show_nav(nav){
                this.$confirm.toast('当前导航内容：<b class="color-green">' + nav + '</b>');
            }
        }
    }
</script>`
