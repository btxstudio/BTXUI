<template>
    <b-view :styles="styles"
            :state="{
                scroll_x: {
                    style: [{ overflowX: 'auto' }],
                    state: scroll === 'x'
                },
                scroll_y: {
                    style: [{ overflowY: 'auto' }],
                    state: scroll === 'y'
                },
                scroll_hide: {
                    style: [{ overflow: 'hidden' }],
                    state: scroll === 'hide'
                }
            }"
            :class="scroll_class">
        <slot />
    </b-view>
</template>

<script>
    import ChapterLink from "./lib/ChapterLink"
    import BView from "./b-view";

    export default {
        name: "b-list",
        components: {
            BView
        },
        /*
        * init-data{
        *   [* styles: (参照：b-style 组件入参)],
        *   [* scroll: "溢出滚动。y：垂直溢出滚动（默认）；x：水平溢出滚动；hide：溢出隐藏],
        *   [* watch-pos: "滚动位置监听],
        * }
        * */
        props: {
            styles: {
                type: String,
                required: true
            },
            scroll: {
                type: String,
                required: false,
                default: "y"
            },
            watchPos: {
                type: Boolean,
                required: false
            },
        },
        watch: {

            //监听滚动状态
            watchPos(state){
                state && this.$_watch_pos();
            }

        },
        data(){
            return {

                //定位器
                chapter_link: new ChapterLink()

            }
        },
        computed: {

            //溢出样式
            scroll_class(){
                switch(this.scroll){
                    case "x":
                        return "auto-h-scroll";
                    case "y":
                        return "auto-scroll";
                    case "hiden":
                        return "no-scroll";
                }
            }

        },
        methods: {

            //重置定位
            reset(){
                this.chapter_link.go_top(this.$el, 0);
            },

            //滚动定位监听
            $_watch_pos(){
                this.$el.onscroll = (e)=>{
                    let st = e.target.scrollTop;
                    if(st === 0) this.$emit("on_to_top"); //滚动置顶
                    if(st === e.target.scrollHeight - e.target.offsetHeight) this.$emit("on_to_bottom"); //滚动置底
                }
            },

        },
        mounted(){
            this.watchPos && this.$_watch_pos();
        }
    }
</script>