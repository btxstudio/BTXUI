<template>
    <div class="slider-widget relative" :style="'height:' + view.height + '; background-color:' + view.bg_color">
        <div class="s-w-view relative" :style="'height:' + view.height">
            <ul class="s-w-bar flex max-h"
                @touchstart="$_touch_start"
                @touchmove="$_touch_move"
                @touchend="$_touch_end"
                @transitionend="$_flip_over"
                :style="'width:' + slider_bar_width + 'px; height:' + view.height + '; transform:translateX(' + touch_point.x + 'px); transition-duration:' + flip_speed">
                <li class="flex-column max" :ref="'$' + page.id" v-for="page of slider_pages" :state="page.state">
                    <div class="grow-1 auto-scroll">
                        <slot :name="page.id"></slot>
                    </div>
                </li>
            </ul>
        </div>

        <!--计数点-->
        <div class="flex-5 absolute z1 b0 max-w h-0 ani-scale-fade-in" v-if="showDot" :style="'bottom:' + showDot.bottom">
            <span class="round mrg-h-d5 w-d5 h-d5" v-for="(page,index) of slider_pages"
                  @click="$_dot_click(index + 1)"
                  :key="index"
                  :data-s="page.state"
                  :data-page="index + 1"
                  :style="'background-color:' + (page.state === 'act'?showDot.act_color:showDot.color)">
            </span>
        </div>

        <!--切换按钮-->
        <div class="s-w-btn absolute pcenter fsize-2d5" data-dir="left" v-if="show_flip_btn" @click="prev"><i class="ico-arrow-left"></i></div>
        <div class="s-w-btn absolute pcenter fsize-2d5" data-dir="right" v-if="show_flip_btn" @click="next"><i class="ico-arrow-right"></i></div>
    </div>
</template>

<script>
    export default {
        name: "slider-widget",
        /*
        * init-data{
        *   pages: [
        *       {
        *           id: "内容名"
        *       }...
        *   ],
        *   view: {
        *       [* height: "组件高度（可缺省，由内容撑起）",]
        *       [* bg_color: "组件背景色（缺省透明）"]
        *   },
        *   [* show-dot: {
        *       bottom: "底边位移",
        *       color: "点颜色",
        *       act_color: "点激活颜色",
        *   },]
        *   [* show-flip-btn: "显示切换按钮",]
        *   [* auto-play-duration: "自动播放时间间隔（毫秒）",]
        *   [* loop: "是否循环播放",]
        *   [* keyboard-flip: "是否启用键盘切换",]
        * }
        * */
        props: {
            pages: {
                type: Array,
                required: true
            },
            view: {
                type: Object,
                required: true
            },
            showDot: {
                type: Object,
                required: false
            },
            showFlipBtn: {
                type: Boolean,
                required: false
            },
            autoPlayDuration: {
                type: Number,
                required: false
            },
            loop: {
                type: String,
                required: false
            },
            keyboardFlip: {
                type: String,
                required: false
            },
        },
        data(){
            return {

                //数据分页
                slider_pages: [],

                //滑动条宽度
                slider_bar_width: "0",

                //指针
                point: {
                    prev: 0,
                    cur: 0,
                },

                //是否自动播放
                auto_play_data: {
                    enable: false,
                    interval: 0
                },

                //触控点
                touch_point: {
                    start: 0,
                    left: 0,
                    x: 0,
                    threshold: 2,
                    offset: 0,
                    direction: {
                        enable: true,
                        offset: false,
                        dir: null
                    }
                },

                //翻页速度
                flip_speed: "0s",

                //滑动启用状态
                touch_move_enable: true,

                //是否显示翻页按钮
                show_flip_btn: false

            }
        },
        methods: {

            //向前翻页
            prev(speed){
                this.smooth_flip(this.point.cur, speed);
            },

            //向后翻页
            next(speed){
                this.smooth_flip(this.point.cur + 2, speed);
            },

            //平滑翻页
            smooth_flip(page, speed){
                clearInterval(this.auto_play_data.interval);
                if(speed) this.flip_speed = speed;
                this.flip(page);
            },

            //翻页
            flip(page){
                let page_len = this.slider_pages.length;
                this.point.prev = this.point.cur;

                //设置播放模式（point:索引，page:页码）
                if(this.loop){//循环
                    if(page < 1){
                        this.point.cur = page_len - 1;
                    }else if(page > page_len){
                        this.point.cur = 0;
                    }else{
                        this.point.cur = page - 1;
                    }
                }else{//定向
                    this.point.cur = Math.min(page_len - 1, Math.max(0, page - 1));
                }

                //位移修正
                this.touch_point.x = this.touch_point.left = -this.point.cur * this.$el.clientWidth;

                if(this.point.prev !== this.point.cur){
                    let cur_page_data = this.slider_pages[this.point.cur];

                    //设置分页激活状态
                    this.slider_pages[this.point.prev].state = "";
                    cur_page_data.state = "act";

                }
                this.auto_play(this.point.cur === page_len - 1? true: false);
            },

            //自动播放
            auto_play(restart){
                if(this.auto_play_data.enable === true){
                    this.auto_play_data.interval = setInterval(()=>{
                        restart? this.smooth_flip(1): this.next();
                    }, this.auto_play_data.duration)
                }
            },

            //停止自动播放
            stop_auto_play(){
                this.auto_play_data.enable = false;
                clearInterval(this.auto_play_data.interval);
            },

            //禁止触控滑动
            forbid_touch(if_forbid){
                this.touch_move_enable = if_forbid === true? false: true;
            },

            //初始化组件数据
            $_init_data(){
                this.point = {
                    prev: 0,
                    cur: 0
                };
                this.show_flip_btn = this.showFlipBtn;
                this.slider_pages = this.pages.map((data, i) => {
                    return {
                        id: data.id,
                        state: i==0?"act":""
                    };
                })
                this.slider_bar_width = this.slider_pages.length * this.$el.clientWidth;//组件宽度
                this.$_init_auto_play();
                if(this.keyboardFlip) this.$_bind_keyboard_flip_event();
            },

            //初始化自动播放
            $_init_auto_play(){
                let duration = this.autoPlayDuration;
                if(duration){
                    this.auto_play_data = {
                        enable: true,
                        duration: duration,
                        interval: null,
                    };
                    this.auto_play();
                }
            },

            //触控开始手势
            $_touch_start(e){
                this.touch_point.start = e.touches[0].pageX;
                this.touch_point.direction.enable = true;
            },

            //触控结束手势
            $_touch_end(){
                this.$_flip_as_threshold();
            },

            //触控滑动手势
            $_touch_move(e){
                if(this.touch_move_enable){
                    let touch = e.touches[0],
                        touch_point = this.touch_point,
                        offset;
                    this.$_flip_direction(touch, touch_point);
                    if(touch_point.direction.dir === "horizontal"){
                        touch_point.offset = offset = touch.pageX - touch_point.start;
                        e.preventDefault();
                        touch_point.x = touch_point.left + offset;
                    }
                }
            },

            //触控分页阈值处理
            $_flip_as_threshold(){
                let touch_point = this.touch_point;
                if(touch_point.offset !== 0){//无位移,不执行
                    let flip = Math.abs(touch_point.x / this.$el.clientWidth),
                        flip_dir = touch_point.x < touch_point.left? "left": "right",
                        page = this.point.cur + 1,
                        overflow_x = flip.toString().split(".")[1][0];
                    if(flip_dir === "right" && overflow_x < 10 - touch_point.threshold){//向右滑动:上一页
                        page--;
                    }else if(flip_dir === "left" && overflow_x >= touch_point.threshold){//向左滑动:下一页
                        page++;
                    }
                    this.smooth_flip(page, ".24s");
                    touch_point.offset = 0;
                }
            },

            //滑动结束
            $_flip_over(){
                this.flip_speed = "0s";
                this.$emit("on_flip", this.point.cur);
            },

            //滑动方向判断
            $_flip_direction(touch, touch_point){
                let direction = touch_point.direction;
                if(direction.enable){
                    if(direction.offset){//方向判断
                        let offset_x = Math.abs(touch.pageX - direction.x),
                            offset_y = Math.abs(touch.pageY - direction.y);
                        direction.dir = offset_x >= offset_y? "horizontal": "vertical";
                        direction.offset = direction.enable = false;
                    }else{
                        direction.x = touch.pageX;
                        direction.y = touch.pageY;
                        direction.offset = true;
                    }
                }
            },

            //计数点点击
            $_dot_click(page){
                this.smooth_flip(page, ".54s");
            },

            //绑定键盘翻页事件
            $_bind_keyboard_flip_event(){
                window.addEventListener("keyup", (e) => {
                    if(e.key === "ArrowLeft") this.prev(".54s");
                    if(e.key === "ArrowRight") this.next(".54s");
                });
            }

        },
        watch: {
            pages(){
                this.$_init_data();
            }
        },
        mounted(){
            this.$_init_data();
        }
    }
</script>

<style lang="scss" scoped>
    .slider-widget{
        .s-w-view{
            overflow: hidden;

            .s-w-bar{
                touch-action: none;
                transition-property: transform;
                transition-timing-function: ease-out;
            }
        }

        //分页按钮
        .s-w-btn{
            top: 50%;
            width: 4rem;
            height: 4rem;
            line-height: 4rem;
            margin-top: -2rem;
            color: rgba(200,200,200,.57);

            &[data-dir="left"]{
                left: 0;
            }
            &[data-dir="right"]{
                right: 0;
            }
        }

    }
</style>