<template>
    <div id="app" class="max-screen flex-column">

        <!-- 顶部主导航栏 -->
        <div class="pad-h-3 bg-color-main flex-between color-sub">

            <!-- 左侧 logo -->
            <div class="flex-4 color-light alpha-4">
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

        <div class="flex flex-grow">

            <!-- 左侧目录 -->
            <div class="flex-column w-25 bg-color-lgray">
                <div class="flex-grow auto-scroll pad-2d5 color-main fsize-1d2">
                    <content-widget v-if="content_data" :data-tree="content_data" @on_select="$_nav_select" />  
                </div>
            </div>
            
            <!-- 右侧介绍 -->
            <div class="flex-grow flex-column">
                <div class="flex-grow auto-scroll fsize-1d2 pad-2d5">
                    <router-view class="container pad-b-7" md />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import ContentWidget from "@/components/content-widget"

export default {
    name: "App",
    data(){
        return {

            //目录导航
            content_data: null

        }
    },
    methods: {

        //导航选择
        $_nav_select(route){
            console.log(route)
        }

    },
    mounted(){
        this.$axios.get("/static/setting.json").then(res => {
            this.content_data = res.data
        })
    },
    components: { ContentWidget }
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