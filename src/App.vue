<template>
    <div id="app" class="max flex-column">

        <!--全局弹窗组件-->
        <confirm-wid :colors="{matte: 'rgba(240,240,240,.6)'}" />

        <!--【手机端】切换侧边栏按钮-->
        <div class="hide fixed r-1rem b-2rem z2 show-s">
            <b-hot styles="w-4 h-4 round bg-color-dgray flex-5 color-sub fsize-1.7"
                   hover="bg-color-dark color-light"
                   @on_click="contents_state = !contents_state">
                <i class="ico-list"></i>
            </b-hot>
        </div>

        <!-- 顶部主导航栏 -->
        <div class="rel z2 pad-h-3 bg-color-main flex-between color-sub">

            <!-- 左侧 logo -->
            <div class="rel z2 flex-4 color-light alpha-d7 fsize-2d5 scale-1d4">
                <i class="ico-btxstudio"></i>
            </div>

            <!-- 右侧导航按钮 -->
            <nav :class="`flex-4 fsize-1d2 bg-color-main l-0 t-0 trans-fast z1 fixed-s max-s flex-5-s fsize-1d4-s pcenter-s flex-column-s translateX-${nav_state? 0: 100}-s`">
                <div class="mrg-h-2 mrg-v-1d5-s">
                    <b-hot link="/" hover="color-light" @on_click="$_go_btx_ui">BTX·UI</b-hot>
                </div>
                <div class="mrg-h-2 mrg-v-1d5-s">
                    <b-hot link="http://level.75sea.com" hover="color-light">Level</b-hot>
                </div>
                <div class="mrg-h-2 mrg-v-1d5-s">
                    <b-hot link="https://github.com/btxstudio/BTXUI" hover="color-light">Github</b-hot>
                </div>
                <div class="mrg-h-2 mrg-v-1d5-s">
                    <b-hot link="http://www.75sea.com" hover="color-light">
                        <i class="ico-company-line mrg-r-d5"></i>七武海科技
                    </b-hot>
                </div>
            </nav>

            <!--【手机端】导航折叠按钮-->
            <div class="rel z2 hide fsize-1d7 show-s">
                <b-hot styles="flex trans-fast rotate-0"
                       hover="color-light"
                       :states="{
                            act: {
                                state: nav_state,
                                style: 'rotate-45 color-light'
                            }
                       }"
                       @on_click="nav_state = !nav_state">
                    <i class="ico-add"></i>
                </b-hot>
            </div>

        </div>

        <div class="flex grow-1">

            <!-- 左侧目录 -->
            <div :class="`flex-column w-30 z1 bg-color-lgray max-h t-0 trans-fast fixed-s ${contents_state? 'translateX-0-s': 'translateX-f100-s'}`">
                <div class="grow-1 auto-scroll pad-h-1 pad-t-2 pad-b-4 fsize-1d1 pad-t-5-s">
                    <content-wid v-bind="nav" ref="cont_tree" @on_select="$_nav_select" />
                </div>
            </div>
            
            <!-- 右侧介绍 -->
            <div class="grow-1 flex-column">
                <b-list styles="grow-1 fsize-1.2" :wide="true">
                    <router-view class="container pad-t-2 pad-h-1d5 pad-b-4 pjustify" md />
                </b-list>
            </div>

        </div>
    </div>
</template>

<script>
import BHot from "@/components/BTXUI/core/b-hot"
import BList from "@/components/BTXUI/core/b-list"
import ContentWid from "@/components/BTXUI/content/content-wid"
import ConfirmWid from "@/components/BTXUI/confirm/confirm-wid"
import content_data from "@/router/content"

export default {
    name: "App",
    components: {
        BHot,
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
            },

            //目录侧边栏状态
            contents_state: false,

            //【手机端】导航状态
            nav_state: false

        }
    },
    computed: {

        //目录
        $cont_tree(){
            return this.$refs.cont_tree;
        }

    },
    methods: {

        //导航路由
        $_nav_select(route){
            this.contents_state = false;
            this.$router.push(route);
        },

        //初始化目录激活项
        $_init_nav_act(content){
            for(let item of content){
                if(item.id === this.$route.path){
                    item.selected = true;
                    break;
                }
                const children = item.children;
                if(children && children.length) this.$_init_nav_act(children);
            }
        },

        //跳转 BTX·UI
        $_go_btx_ui(){
            this.$cont_tree.clear_selected();
            this.nav_state = false;
        }

    },
    beforeMount(){
        this.$_init_nav_act(content_data);
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