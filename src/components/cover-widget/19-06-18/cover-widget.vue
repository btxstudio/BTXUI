<!--19-06-18-->
<template>
    <div class="cover-widget" state="show" ref="CoverWidget">
        <span class="c-w-clock"><b class="c-w-time">{{play_duration}}</b>s</span>
        <a class="c-w-enter" @click="$_cover_end">直接进入</a>
        <div class="c-w-img" ref="$Cover"></div>
    </div>
</template>

<script>
    export default {
        name: "cover-widget",
        /*
        * init-data{
        *   src: "背景图地址",
        *   duration: "播放持续时间（毫秒）"
        * }
        * */
        props: {
            src: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            }
        },
        data(){
            return {

                /*倒计时定时器*/
                count_down: null,

                /*播放持续时间*/
                play_duration: 0,

            }
        },
        methods: {

            /*封面加载*/
            $_cover_load(){
                let $img = new Image(),
                    cover_src = this.src;
                $img.onload = ()=>{
                    this.$store.commit("record_user_adv_cover", cover_src.split("user/")[1]);//记录缓存
                    this.$_cover_loaded(cover_src + ".jpg");
                }

                /*加载默认图*/
                $img.onerror = ()=> {
                    this.$_cover_loaded(this.$store.state.static_res.pc_bg.val);
                }

                $img.src = cover_src + ".jpg";
            },

            /*封面加载完成*/
            $_cover_loaded(cover_src){
                this.play_duration = this.duration;
                this.$refs.$Cover.style.backgroundImage = "url('" + cover_src + "')";//显示封面
                this.$emit("on_cover_loaded");

                /*“广告”倒计时开始*/
                this.count_down = setInterval(()=>{
                    this.play_duration --;
                    if(this.play_duration === 0){
                        this.$_cover_end();
                        clearInterval(this.count_down);
                    }
                }, 1000);

            },

            /*封面展示结束*/
            $_cover_end(){
                clearInterval(this.count_down);
                this.$el.setAttribute("state", "");
                this.$emit("on_cover_end");
            },

            /*跳过广告*/
            $_skip_cover(){
                if(this.$store.state.adv_cover.indexOf(this.src.split("user/")[1]) >= 0){
                    this.$el.setAttribute("state", "");
                }
            }

        },
        mounted(){
            this.$_skip_cover();
            this.$_cover_load();
        }
    }
</script>

<style scoped>
    @import "../assets/css/cover-widget.css";
</style>