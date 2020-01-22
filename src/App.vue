<template>
    <div id="app" class="max-screen flex-column">

        <!-- 顶部主导航栏 -->
        <div class="pad-h-3 main-bg-color flex-layout-spread sub-color">

            <!-- 左侧 logo -->
            <div class="flex-layout-middle">
                <div class="logo-widget">
                    <i class="ico-btxstudio"></i>
                </div>
            </div>

            <!-- 右侧导航按钮 -->
            <div class="flex-layout-middle fsize-1d2">
                <router-link to="/" class="pad-r-3">BTX·UI</router-link>
                <a href="http://75sea.com" class="pad-r-3">Level</a>
                <a href="http://75sea.com" class="pad-r-3">Github</a>
                <a href="http://75sea.com" class="pad-r-3">下载</a>
                <a href="http://www.75sea.com" target="_blank" class="pad-r-3">七武海科技</a>
            </div>

        </div>

        <div class="grid flex-grow">

            <!-- 左侧目录 -->
            <div class="col-3 pad-2d5 sub-bg-color auto-scroll main-color fsize-1d3">
                <content-widget v-if="content_data" :data-tree="content_data" />  
            </div>
            
            <!-- 右侧介绍 -->
            <div class="col-9 pad-2d5 auto-scroll fsize-1d2">
                <router-view />
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
    mounted(){
        this.$axios.get("/static/setting.json").then(res => {
            this.content_data = res.data
        })
    },
    components: { ContentWidget }
}
</script>

<style lang="scss">
    
    /* 全局样式 */ 
    @import "./sass/btx";

</style>

<style lang="scss" scoped>
    .logo-widget{
        transform: scale(1.35);
        font-size: 2.7rem;
    }
</style>