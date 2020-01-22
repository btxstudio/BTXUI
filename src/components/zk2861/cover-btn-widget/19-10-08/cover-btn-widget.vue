<!--19-10-08-->
<template>
    <div class="cover-btn-widget" :style="'width:' + btnWidth" @click="$_click">
        <div class="cb-w-matte"></div>
        <img class="cb-w-cover" :src="coverSrc" @load="$_loaded" @error="$_loaded_default" />
        <div class="cb-w-text">
            <span class="cb-w-corner"></span>
            {{btnText}}
            <span class="cb-w-corner"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cover-btn-widget",
        /*
        * init-data{
        *   cover-src="封面图",
        *   cover-default-src="默认封面图（加载封面图失败后重载）",
        *   btn-text="按钮名",
        *   [btn-link="按钮内链（组件跳转,优先级高于外链）",]
        *   [btn-href="按钮外链",]
        *   [btn-width="按钮宽度",]
        * }
        * */
        props: {
            coverSrc: {
                type: String,
                required: true
            },
            coverDefaultSrc: {
                type: String,
                required: true
            },
            btnText: {
                type: String,
                required: true
            },
            btnLink: {
                type: String,
                required: false
            },
            btnHref: {
                type: String,
                required: false
            },
            btnWidth: {
                type: String,
                required: false
            },
        },
        methods: {

            //按钮点击
            $_click(){
                if(this.btnLink){ //内链
                    this.$router.push(this.btnLink);
                }else if(this.btnHref){ //外链
                    location.assign(this.btnHref);
                }else{ //回调
                    this.$emit("on_click")
                }
            },

            //图片加载完成显示
            $_loaded(){
                this.$el.setAttribute("state-show", true);
            },

            //图片加载失败显示默认图
            $_loaded_default(e){
                e.currentTarget.src = this.coverDefaultSrc;
            }

        }
    }
</script>

<style scoped>
    @import "../assets/css/cover-btn-widget.css";
</style>