<template>
    <b-view :styles="`rel h-${view.height} bg-color-${view.bg_color}`"
            @on_enter="stop_auto_play"
            @on_leave="auto_play_data.enable && auto_play()">

        <!--轮播内容-->
        <b-view :styles="`rel no-scroll h-${view.height}`">
            <b-view ref="sliderBar"
                    :styles="`flex touch-none h-${view.height}`"
                    :dynamic="`w-${slider_bar_width}px translateX-${this.touch_point.x.toString().replace('-', 'f')}px ${this.flip_ani? 'trans-fast': 'trans-no'}`"
                    @on_touchstart="$_touch_start"
                    @on_touchmove="$_touch_move"
                    @on_touchend="$_touch_end"
                    @on_transitionend="$_flip_over">
                <b-list v-for="page of slider_pages" :key="page.id"
                        styles="grow-1"
                        :state="page.state">
                    <slot :name="page.id"></slot>
                </b-list>
            </b-view>
        </b-view>

        <!--计数点-->
        <b-view :styles="`flex-5 abs z1 max-w h-0 b-${showDot.bottom}`" v-if="showDot">
            <b-hot v-for="(page,index) of slider_pages" :key="index"
                   :styles="`round mrg-h-.5 w-.5 h-.5 bg-color-${showDot.color}`"
                   :states="{
                        act: {
                            style: `bg-color-${showDot.act_color}`,
                            state: page.state === 'act'
                        }
                   }"
                   @on_click="$_dot_click(index + 1)"
                   :data-s="page.state"
                   :data-page="index + 1">
            </b-hot>
        </b-view>

        <!--切换按钮-->
        <template v-if="show_flip_btn" >
            <b-hot styles="round bg-color-neutral translateY-f50 flex-5 abs t-50% l-1 w-4 h-4 fsize-2"
                   hover="bg-color-rgba(255,255,255,.4)"
                   @on_click="prev">
                <b-icon icon="arrow-left" />
            </b-hot>
            <b-hot styles="round bg-color-neutral translateY-f50 flex-5 abs t-50% r-1 w-4 h-4 fsize-2"
                   hover="bg-color-rgba(255,255,255,.4)"
                   @on_click="next">
                <b-icon icon="arrow-right" />
            </b-hot>
        </template>

    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BHot from "@/components/BTXUI/core/b-hot"
    import BIcon from "@/components/BTXUI/core/b-icon"
    import BList from "@/components/BTXUI/core/b-list"

    const desc = ["该组件用于设置内容轮播，支持页面 resize 时自动校正尺寸。",{
            cover: "slider-wid.png",
            title: "轮播执行机制原理"
        }],
        extend = [],
        dependent = ["b-list", "b-hot", "b-icon", "b-view"],
        api = {
            event: [
                {
                    name: "on_flip",
                    ef: "分页完成",
                    params: "cur_page"
                },
                {
                    name: "on_load",
                    ef: "分页结构生成",
                    params: "-"
                }
            ],
            methods: [
                {
                    name: "prev",
                    ef: "向前翻页",
                    params: "flip_ani",
                    return: "-"
                },
                {
                    name: "next",
                    ef: "向后翻页",
                    params: "flip_ani",
                    return: "-"
                },
                {
                    name: "flip",
                    ef: "翻页",
                    params: "page, flip_ani",
                    return: "-"
                },
                {
                    name: "auto_play",
                    ef: "自动播放",
                    params: "restart",
                    return: "-"
                },
                {
                    name: "stop_auto_play",
                    ef: "停止自动播放",
                    params: "-",
                    return: "-"
                },
                {
                    name: "forbid_touch",
                    ef: "禁止触控滑动",
                    params: "if_forbid",
                    return: "-"
                }
            ]
        },
        init_data = `{
        pages: [
            {
                id: "内容标识"
            },...
        ],
        /* view: {
            height: "轮播器高度（默认为 auto，由内容撑起）",
            bg_color: "轮播器背景色（默认为透明）"
        } */,
        /* showDot: {
            bottom: "底边位移",
            color: "点颜色",
            act_color: "点激活颜色"
        } */,
        /* showFlipBtn: "显示切换按钮" */,
        /* autoPlayDuration: "自动播放时间间隔（毫秒）" */,
        /* loop: "是否循环播放" */,
        /* keyboardFlip: "是否启用键盘切换" */
    }`;

    export default {
        name: "slider-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BHot,
            BIcon,
            BView,
            BList
        },
        props: {
            pages: {
                type: Array,
                required: true
            },
            view: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        height: "auto",
                        bg_color: "none"
                    }
                }
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
                type: Boolean,
                required: false
            },
            keyboardFlip: {
                type: Boolean,
                required: false
            },
        },
        data(){
            return {

                //数据分页
                slider_pages: [],

                //滑动条宽度
                slider_bar_width: 0,

                //索引指针
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

                //翻页缓动
                flip_ani: true,

                //滑动启用状态
                touch_move_enable: true,

                //是否显示翻页按钮
                show_flip_btn: false

            }
        },
        computed: {

            //轮播容器
            slider_bar(){
                return this.$refs.sliderBar;
            }

        },
        methods: {

            //向前翻页
            prev(flip_ani){
                this.flip(this.point.cur, flip_ani);
            },

            //向后翻页
            next(flip_ani){
                this.flip(this.point.cur + 2, flip_ani);
            },

            //翻页
            flip(page, flip_ani=true){
                let page_len = this.slider_pages.length;

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
                this.touch_point.x = this.touch_point.left = -this.point.cur * this.$el.clientWidth; //位移

                //设置分页激活状态
                if(this.point.prev !== this.point.cur){
                    let cur_page_data = this.slider_pages[this.point.cur];
                    this.slider_pages[this.point.prev].state = "";
                    cur_page_data.state = "act";
                    this.point.prev = this.point.cur;
                }

                //设置分页缓动
                !flip_ani && this.$emit("on_flip", this.point.cur + 1);
                this.flip_ani = flip_ani;
            },

            //自动播放
            auto_play(restart){
                this.auto_play_data.interval = setInterval(()=>{
                    restart? this.flip(1): this.next(true);
                }, this.auto_play_data.duration)
            },

            //停止自动播放
            stop_auto_play(){
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
                this.$_set_slider_bar_width();
                this.$_init_auto_play();
                if(this.keyboardFlip) this.$_bind_keyboard_flip_event();

                //分页结构生成
                this.$nextTick(()=>{
                    this.$emit("on_load");
                })

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
                this.flip_ani = false;
                this.stop_auto_play();
            },

            //触控结束手势
            $_touch_end(){
                this.$_flip_as_threshold();
                this.auto_play_data.enable && this.auto_play()
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
                        e.cancelable && e.preventDefault();
                        touch_point.x = touch_point.left + offset;
                    }
                }
            },

            //触控分页阈值处理
            $_flip_as_threshold(){
                let touch_point = this.touch_point;
                if(touch_point.offset !== 0){ //无位移,不执行
                    let flip = Math.abs(touch_point.x / this.$el.clientWidth),
                        flip_dir = touch_point.x < touch_point.left? "left": "right",
                        page = this.point.cur + 1,
                        overflow_x = flip.toString().split(".")[1][0];
                    if(flip_dir === "right" && overflow_x < 10 - touch_point.threshold){//向右滑动:上一页
                        page--;
                    }else if(flip_dir === "left" && overflow_x >= touch_point.threshold){//向左滑动:下一页
                        page++;
                    }
                    this.flip(page, true);
                    touch_point.offset = 0;
                }
            },

            //滑动结束
            $_flip_over(){
                this.$emit("on_flip", this.point.cur + 1);
            },

            //滑动方向判断
            $_flip_direction(touch, touch_point){
                let direction = touch_point.direction;
                if(direction.enable){
                    if(direction.offset){ //方向判断
                        let offset_x = Math.abs(touch.pageX - direction.x),
                            offset_y = Math.abs(touch.pageY - direction.y);
                        direction.dir = offset_x >= offset_y? "horizontal": "vertical";
                        direction.offset = direction.enable = false;
                    }else{ //定位起始坐标
                        direction.x = touch.pageX;
                        direction.y = touch.pageY;
                        direction.offset = true;
                    }
                }
            },

            //计数点点击
            $_dot_click(page){
                this.flip(page, true);
            },

            //绑定键盘翻页事件
            $_bind_keyboard_flip_event(){
                window.addEventListener("keyup", (e) => {
                    if(e.key === "ArrowLeft") this.prev(".54s");
                    if(e.key === "ArrowRight") this.next(".54s");
                });
            },

            //设置 slider_bar 宽度
            $_set_slider_bar_width(){
                this.slider_bar_width = this.slider_pages.length * this.$el.clientWidth;
            }

        },
        watch: {
            pages(){
                this.$_init_data();
            }
        },
        mounted(){
            this.$_init_data();
            window.addEventListener("resize", this.$_set_slider_bar_width)
        },
        destroyed(){
            window.removeEventListener("resize", this.$_set_slider_bar_width);
        }
    }
</script>