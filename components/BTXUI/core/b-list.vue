<template>
    <b-view :styles="`rel grow-1 max ${styles} over-hide`">

        <!--置顶按钮-->
        <b-hot :styles="`abs w-3.7 h-3.7 transform-rotate(180deg) z2 round flex-5 line thick-2 line-neutral trans-fast fsize-1.7 r-${go_top_btn.pos.right} b-${go_top_btn.pos.bottom} color-${go_top_btn.colors.normal.icon} bg-color-${go_top_btn.colors.normal.bg}`"
               :hover="`line-none color-${go_top_btn.colors.hover.icon} bg-color-${go_top_btn.colors.hover.bg}`"
               :states="{
                   hide: {
                       state: top_btn_hide,
                       style: 'b-f5'
                   }
               }"
               @on_click="reset">
            <b-icon icon="xiala" />
        </b-hot>

        <!--滚动区域-->
        <b-view styles="max"
                ref="list"
                :states="{
                    scroll_x: {
                        style: 'over-scroll no-wrap',
                        state: scroll === 'x'
                    },
                    scroll_y: {
                        style: 'over-scroll',
                        state: scroll === 'y'
                    },
                    scroll_hide: {
                        style: 'over-hide',
                        state: scroll === 'hide'
                    }
                }"
                @on_touchmove="$_touch_move"
                :class="scroll_class">
            <slot />
        </b-view>

    </b-view>
</template>

<script>
    import ChapterLink from "./lib/ChapterLink"
    import BView from "./b-view"
    import BHot from "./b-hot"
    import BIcon from "./b-icon"

    const desc = ["该组件用于实现长内容的溢出滚动及隐藏效果，此外还具备滚动条定位监听及懒加载接口。"],
        extend = [],
        dependent = ["ChapterLink", "b-view", "b-hot", "b-icon"],
        api = {
            methods: [
                {
                    name: "reset",
                    ef: "重置定位",
                    params: "-",
                    return: "-"
                }
            ],
            event: [
                {
                    name: "on_to_top",
                    ef: "滚动置顶",
                    params: "spread"
                },
                {
                    name: "on_to_bottom",
                    ef: "滚动置底",
                    params: "event"
                },
                {
                    name: "on_scroll",
                    ef: "滚动",
                    params: "{dir:scroll_direction, left:scroll_left, top:scroll_top}"
                }
            ]
        },
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* wide: "加宽滚动条，默认 false" */,
        /* scroll: "溢出滚动。y：垂直溢出滚动（默认）；x：水平溢出滚动；hide：溢出隐藏" */,
        /* goTopBtn: {
            show_distance: "按钮显示时距离视口顶部的距离，默认为：false 不显示；可基于容器高度进行倍数设置：'1scr（即 1 屏的高度）'，也支持具体数值",
            response_direction: "按钮基于滑动方向响应式显示，默认关闭",
            pos: {
                right: "距离右侧距离，默认 1rem",
                bottom: "距离底部距离，默认 2rem"
            },
            colors: {
                normal: {
                    icon: "常规状态图标色，默认 #777",
                    bg: "常规状态背景色，默认 dark",
                },
                hover: {
                    icon: "悬停状态图标色，默认 light",
                    bg: "悬停状态背景色，默认 rgba(0,0,0,.6)",
                }
            }
        } */
    }`;

    let orig_scroll_pos = {x:0, y:0}; //滚动原始定位

    export default {
        name: "b-list",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BHot,
            BIcon
        },
        props: {
            styles: {
                type: String,
                required: false
            },
            scroll: {
                type: String,
                required: false,
                default: "y"
            },
            wide: {
                type: Boolean,
                required: false
            },
            goTopBtn: {
                type: Object,
                required: false,
                default: ()=>{
                    return {}
                }
            }
        },
        watch: {

            //监听路由
            $route(){
                this.reset();
            }

        },
        data(){
            return {

                //定位器
                chapter_link: new ChapterLink(0),

                //触控滑动方向
                touch_move_dir: "v",

                //置顶按钮隐藏状态
                top_btn_hide: true,

                //置顶按钮显示，距离容器顶部距离
                show_distance: 0

            }
        },
        computed: {

            //滚动容器
            $list(){
                return this.$refs.list.$el;
            },

            //溢出样式
            scroll_class(){
                switch(this.scroll){
                    case "x":
                        return "auto-h-scroll no-wrap";
                        break;
                    case "y":
                        return this.wide? "wide-auto-scroll": "auto-scroll";
                        break;
                    case "hide":
                        return "over-hide";
                }
            },

            //置顶按钮配置
            go_top_btn(){
                return {
                    show_distance: false,
                    response_direction: false,
                    pos: {
                        right: "1",
                        bottom: "2"
                    },
                    colors: {
                        normal: {
                            icon: "#777",
                            bg: "dark",
                        },
                        hover: {
                            icon: "light",
                            bg: "rgba(0,0,0,.6)",
                        }
                    },
                    ...this.goTopBtn
                }
            }

        },
        methods: {

            //重置定位
            reset(){
                this.chapter_link.go_top(this.$list, 0);
            },

            //滚动定位监听
            $_watch_pos(){
                this.$list.onscroll = (e)=>{
                    const st = e.target.scrollTop,
                        sl = e.target.scrollLeft,
                        h_offset = sl - orig_scroll_pos.x,
                        v_offset = st - orig_scroll_pos.y;
                    let dir;
                    if(Math.abs(h_offset) >= Math.abs(v_offset)){ //水平方向
                        e.stopPropagation();
                        dir = h_offset >= 0? "l2r": "r2l";
                    }else { //垂直方向
                        dir = v_offset >= 0? "t2b": "b2t";
                    }
                    orig_scroll_pos.x = sl;
                    orig_scroll_pos.y = st;
                    this.$emit("on_scroll", {dir, left:sl, top:st});

                    st === 0 && this.$emit("on_to_top", e); //滚动置顶
                    st === e.target.scrollHeight - e.target.offsetHeight && this.$emit("on_to_bottom", e); //滚动置底
                    this.go_top_btn.show_distance && this.$_set_top_btn(dir, st); //设置置顶按钮
                }
            },

            //触控移动
            $_touch_move(e){
                this.scroll === "x" && e.stopPropagation();
            },

            //设置置顶按钮显示，距离容器顶部距离
            $_set_show_distance(){
                const show_distance = this.go_top_btn.show_distance;
                if(!show_distance) return;
                const distance = this.go_top_btn.show_distance.split("scr");
                if(distance.length > 1){ //基于容器高度的倍数
                    this.show_distance = distance[0] * this.$el.clientHeight;
                }else { //具体值
                    this.show_distance = distance[0];
                }
            },

            //设置置顶按钮
            $_set_top_btn(dir, top){
                if(top > this.show_distance) { //显示
                    this.top_btn_hide = false;
                    if(this.go_top_btn.response_direction){ //滚动方向响应显示状态
                        if(dir === "b2t"){
                            this.top_btn_hide = false;
                        }else {
                            this.top_btn_hide = true;
                        }
                    }
                }else { //隐藏
                    this.top_btn_hide = true;
                }
            },

        },
        mounted(){
            this.$_watch_pos();
            setTimeout(()=>{
                this.$_set_show_distance();
            }, 1000);
        }
    }
</script>