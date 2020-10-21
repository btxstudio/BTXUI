<template>
    <a @click="$_click" @dblclick="$_dblclick"
       @mouseenter="$_enter" @mouseleave="$_leave"
       @touchstart="$_enter" @touchend="$_leave"
       :href="url"
       :target="target"
       :style="computed_style" >
        <slot />
    </a>
</template>

<script>
    import ChapterLink from "./lib/ChapterLink"
    import bStyle from "./styles/b-style"

    let desc = ["该组件用于实现热点交互操作。"],
        extend = ["b-style"],
        dependent = ["ChapterLink"],
        api = {
            event: [
                {
                    name: "on_click",
                    ef: "左键单击",
                    params: "",
                },
                {
                    name: "on_dblclick",
                    ef: "左键双击",
                    params: "",
                },
                {
                    name: "on_enter",
                    ef: "鼠标移入或手指按下（悬停）",
                    params: "",
                },
                {
                    name: "on_leave",
                    ef: "鼠标移出或手指抬起",
                    params: "",
                }
            ]
        },
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* link: "外部链接 | 组件路由 | 手机拨号 | {
            chapter_id: "内部链接元素 id",
            chapter_link_data: "(参照：ChapterLink 类构造函数)"
        }" */,
        /* hover: "悬停样式" */,
        /* forbid: "鼠标点击事件及链接禁用，默认 false，不禁用" */,
    }`;

    export default {
        extends: bStyle,
        name: "b-hot",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            link: {
                type: [String, Object],
                required: false
            },
            hover: {
                type: String,
                required: false
            },
            forbid: {
                type: Boolean,
                required: false
            },
        },
        data(){
            return {

                //链接开启方式
                target: null,

                //内链控制器
                chapter_link: this.$_init_chapter_link()

            }
        },
        computed: {

            //链接地址
            url(){
                if(this.forbid) return false; //禁用效果
                let link = this.link;
                if(!link) return "javascript:;"
                if(typeof(link) === "string"){
                    if(link.search("http") === 0){ //外部链接
                        this.target = "_blank";
                        return link;
                    }else if(link.search("/") === 0){ //组件路由
                        return `#${link}`;
                    }else if(link.search("tel:") === 0){ //手机拨号
                        return link;
                    }
                } else{ //内部链接
                    return `#${this.$route.path}`;
                }
            },

        },
        methods: {

            //初始化内链控制器
            $_init_chapter_link(){
                if(this.link && typeof(this.link) === "object"){
                    let {ani_speed, offset, callback} = this.link.chapter_link_data || {};
                    return new ChapterLink(ani_speed, offset, callback);
                }else {
                    return null;
                }
            },

            //执行点击
            $_click(e){
                e.stopPropagation();
                !this.forbid && this.$emit("on_click");
                this.chapter_link && this.chapter_link.go_chapter(this.link.chapter_id); //内部链接
            },

            //执行双击
            $_dblclick(e){
                e.stopPropagation();
                !this.forbid && this.$emit("on_dblclick");
            },

            //鼠标移入
            $_enter(){
                !this.cur_states.length && this.toggle_style("hover"); //仅限默认状态下
                this.$emit("on_enter");
            },

            //鼠标移出
            $_leave(){
                this.cur_states[0] === "hover" && this.reset_style(); //仅限 hover 状态下
                this.$emit("on_leave");
            }

        },
        mounted(){
            this.append_state(this.hover, "hover");
        }
    }
</script>