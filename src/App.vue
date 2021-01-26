<template>
    <div id="app" class="max-screen flex-column">

        <!--全局弹窗组件-->
        <confirm-wid :colors="{matte: 'rgba(240,240,240,.6)'}" />

        <!-- 顶部主导航栏 -->
        <div class="pad-h-3 bg-color-main flex-between color-sub">

            <!-- 左侧 logo -->
            <div class="flex-4 color-light alpha-d4">
                <div class="fsize-2d5 scale-1d4">
                    <i class="ico-btxstudio"></i>
                </div>
            </div>

            <!-- 右侧导航按钮 -->
            <div class="flex-4 fsize-1d2">
                <router-link to="/" class="pad-r-3">BTX·UI</router-link>
                <a href="http://75sea.com" class="pad-r-3">Level</a>
                <a href="https://github.com/btxstudio/BTXUI" target="_blank" class="pad-r-3">Github</a>
                <a href="http://75sea.com" class="pad-r-3">下载</a>
                <a href="http://www.75sea.com" target="_blank" class="pad-r-3">七武海科技</a>
            </div>

        </div>

        <div class="flex grow-1">

            <!-- 左侧目录 -->
            <div class="flex-column w-30 bg-color-lgray">
                <div class="grow-1 auto-scroll pad-h-1 pad-t-2 pad-b-4 fsize-1d1">
                    <content-wid v-bind="nav" @on_select="$_nav_select" />
                </div>
            </div>
            
            <!-- 右侧介绍 -->
            <div class="grow-1 flex-column">
                <b-list styles="grow-1 fsize-1.2 pad-2.5" :wide="true">
                    <router-view class="container pad-b-7" md />
                </b-list>
            </div>

        </div>
    </div>
</template>

<script>
import BList from "@/components/BTXUI/core/b-list"
import ContentWid from "@/components/BTXUI/content/content-wid"
import ConfirmWid from "@/components/BTXUI/confirm/confirm-wid"
import content_data from "@/router/content"

export default {
    name: "App",
    components: {
        BList,
        ConfirmWid,
        ContentWid
    },
    data(){
        return {

            //目录导航
            nav: {
                dataTree: content_data,
                colors: {
                    normal: {
                        text: "#777",
                        bg: "none",
                    },
                    act: {
                        text: "blue",
                        bg: "none",
                    },
                    hover: {
                        text: "dgray",
                        bg: "none",
                    }
                },
            }

        }
    },
    methods: {

        //导航路由
        $_nav_select(route){
            this.$router.push(route);
        }

    }
}
</script>

<style lang="scss">

    //全局样式
    @import "./sass/btx";

    //平板端
    @media only screen and (max-width: 1367px){
        @import "./sass/btx.pad";
    }

    //移动端
    @media only screen and (max-width: 740px){
        @import "./sass/btx.mob";
    }
    
</style>