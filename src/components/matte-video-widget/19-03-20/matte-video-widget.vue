<!--19-03-20-->
<template>
    <div class="matte-video-widget ani-fade-in" v-if="video.enable" @touchmove="_forbid_touch_move">
        <div class="mv-w-box">
            <span class="mv-w-close" @click="close">关闭</span>
            <div class="mv-w-title">{{video.title}}</div>
            <video controls :src="video.src" :poster="video.cover"></video>
        </div>
    </div>
</template>

<script>
    export default {
        name: "matte-video-widget",
        props: ["init-data"],
        data() {
            return {

                /*视频播放器*/
                video: {
                    enable: false,
                    title: "",
                    src: "",
                    cover: "",
                    direct_play: false
                },

            }
        },
        methods: {
            /*开启视频层*/
            /*
            * data{
            *   title: "视频标题",
            *   src: "视频资源",
            *   [cover: "视频封面",]
            *   [direct_play: "开启后是否直接播放",]
            *   [click_matte_exit: "是否单击遮罩退出",]
            *   [dblclick_matte_exit: "是否双击遮罩退出",]
            * }
            * */
            open(data) {
                this._init_data(data)
                this.video.enable = true;
                this.$nextTick(()=>{
                    this._set_matte_click_exit(data);
                    if (data.direct_play) {//直接播放
                        this.$el.querySelector("video").play();
                    }
                })
            },

            /*关闭视频层*/
            close() {
                this.video.enable = false;
            },

            /*初始化数据*/
            _init_data(data){
                this.video.title = data.title;
                this.video.src = data.src;
                this.video.cover = data.cover;
            },

            /*设置遮罩点击退出*/
            _set_matte_click_exit(data){
                let click_method = false;
                if(data.click_matte_exit){
                    click_method = "click";
                }else if(data.dblclick_matte_exit){
                    click_method = "dblclick";
                }
                if(click_method){//点击遮罩退出
                    this.$el.addEventListener(click_method, ()=>{
                        this.close();
                    })
                }
            },

            /*禁止手机端滑动*/
            _forbid_touch_move(e){
                e.preventDefault();
            }

        },
    }
</script>

<style scoped>
    @import "../../assets/css/matte-video-widget.css";
</style>