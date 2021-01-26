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

    const desc = ["该组件用于实现长内容的溢出滚动及隐藏效果，此外还具备滚动条定位监听及懒加载接口。"],
        extend = [],
        dependent = ["ChapterLink", "b-view"],
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
                }
            ]
        },
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* wide: "加宽滚动条，默认 false" */,
        /* scroll: "溢出滚动。y：垂直溢出滚动（默认）；x：水平溢出滚动；hide：溢出隐藏" */,
        /* watchPos: "滚动位置监听，默认 false" */,
    }`;

    export default {
        name: "b-list",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView
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
                chapter_link: new ChapterLink(0)

            }
        },
        computed: {

            //溢出样式
            scroll_class(){
                switch(this.scroll){
                    case "x":
                        return "auto-h-scroll";
                        break;
                    case "y":
                        return this.wide? "wide-auto-scroll": "auto-scroll";
                        break;
                    case "hide":
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
                    if(st === 0) this.$emit("on_to_top", e); //滚动置顶
                    if(st === e.target.scrollHeight - e.target.offsetHeight) this.$emit("on_to_bottom", e); //滚动置底
                }
            },

        },
        mounted(){
            this.watchPos && this.$_watch_pos();
        },
        updated(){
            this.reset();
        }
    }
</script>