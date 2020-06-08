<template>
    <b-view :styles="['flex-grow', 'rel', scroll_state.style]"
            :class="scroll_state.class_name">
        <slot />
    </b-view>
</template>

<script>
    import BView from "@/components/core/b-view";

    export default {
        name: "b-list",
        components: {
            BView
        },
        /*
        * init-data{
        *   [* scroll: "溢出滚动。y：垂直溢出滚动（默认）；x：水平溢出滚动；hide：溢出隐藏],
        *   [* watch-pos: "滚动位置监听],
        * }
        * */
        props: {
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
        computed: {

            //溢出样式
            scroll_state(){
                let state;
                switch(this.scroll){
                    case "x":
                        state = {
                            style: {
                                overflowX: "auto"
                            },
                            class_name: "auto-h-scroll"
                        }
                        break;
                    case "y":
                        state = {
                            style: {
                                overflowY: "auto"
                            },
                            class_name: "auto-scroll"
                        }
                        break;
                    case "hiden":
                        state = {
                            style: {
                                overflow: "hidden"
                            },
                            class_name: "no-scroll"
                        }
                }
                return state;
            }

        },
        methods: {

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