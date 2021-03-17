<template>
    <a @click="$_click" @dblclick="$_dblclick"
       @mouseenter="$_enter" @mouseleave="$_leave"
       @touchstart="$_enter" @touchend="$_leave"
       @mousemove="$emit('on_move', $event)"
       :href="url"
       :target="target"
       :download="download"
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
                    params: "event",
                },
                {
                    name: "on_dblclick",
                    ef: "左键双击",
                    params: "event",
                },
                {
                    name: "on_enter",
                    ef: "鼠标移入或手指按下（悬停）",
                    params: "event",
                },
                {
                    name: "on_leave",
                    ef: "鼠标移出或手指抬起",
                    params: "event",
                },
                {
                    name: "on_move",
                    ef: "鼠标移动",
                    params: "event",
                }
            ]
        },
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* link: "外部链接 | 组件路由 | 手机拨号 | {
            chapter_id: "内部链接元素 id",
            chapter_link_data: "(参照：ChapterLink 类构造函数)"
        } | {
            download: "下载文件名",
            res: "下载资源地址"
        }" */,
        /* hover: "悬停样式值" */,
        /* forbid: "鼠标点击事件及链接禁用，默认 false，不禁用" */,
        /* newFrame: "强制开启新窗口，默认 false" */,
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
            newFrame: {
                type: Boolean,
                required: false
            },
        },
        data(){
            return {

                //链接开启方式
                target: this.newFrame? "_blank": null,

                //下载地址
                download: null,

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
                        return (this.$router.mode === "history"? "": "#") + link;
                    }else if(link.search(/^(tel|mailto):/) === 0){ //手机拨号 | 邮件
                        return link;
                    }
                } else{
                    if(link.download){ //文件下载
                        this.download = link.download;
                        return link.res;
                    }else { //内部链接
                        return `#${this.$route.path}`;
                    }
                }
            },

        },
        methods: {

            //初始化内链控制器
            $_init_chapter_link(){
                if(this.link && this.link.chapter_id){
                    let {ani_speed, offset, callback} = this.link.chapter_link_data || {};
                    return new ChapterLink(ani_speed, offset, callback);
                }else {
                    return null;
                }
            },

            //执行点击
            $_click(e){
                e.stopPropagation();
                !this.forbid && this.$emit("on_click", e);
                this.chapter_link && this.chapter_link.go_chapter(this.link.chapter_id); //内部链接
                this.link && this.reset_style();
            },

            //执行双击
            $_dblclick(e){
                e.stopPropagation();
                !this.forbid && this.$emit("on_dblclick", e);
                this.link && this.reset_style();
            },

            //鼠标移入
            $_enter(e){
                !this.cur_states.length && this.toggle_style("hover"); //仅限默认状态下
                this.$emit("on_enter", e);
            },

            //鼠标移出
            $_leave(e){
                this.cur_states[0] === "hover" && this.reset_style(); //仅限 hover 状态下
                this.$emit("on_leave", e);
            }

        },
        mounted(){
            this.append_state(this.hover, "hover");
        }
    }
</script>