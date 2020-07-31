<template>
    <a @click="$_click" @dblclick="$_dblclick" @mouseenter="$_enter" @mouseleave="$_leave"
       :href="url"
       :target="target"
       :style="computed_style" >
        <slot />
    </a>
</template>

<script>
    import bStyle from "./styles/b-style";

    export default {
        extends: bStyle,
        name: "b-hot",
        /*
        * init-data{
        *   [* styles: (参照：b-style 组件入参)],
        *   [* link: "外部链接|组件路由"],
        *   [* hover: "鼠标悬停样式"],
        *   [* forbid: "鼠标点击事件及链接禁用，默认 false，不禁用"],
        * }
        * */
        props: {
            link: {
                type: String,
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
                target: null

            }
        },
        computed: {

            //链接地址
            url(){
                if(this.forbid) return false; //禁用效果
                let link = this.link;
                if(!link) return "javascript:;"
                if(link.search("http") === 0){
                    this.target = "_blank";
                    return link;
                }else{
                    return `#${link}`;
                }
            },

        },
        methods: {

            //执行点击
            $_click(){
                !this.forbid && this.$emit("on_click");
            },

            //执行双击
            $_dblclick(){
                !this.forbid && this.$emit("on_dblclick");
            },

            //鼠标移入
            $_enter(){
                !this.cur_state.length && this.toggle_style("hover"); //仅限默认状态下
            },

            //鼠标移出
            $_leave(){
                this.cur_state[0] === "hover" && this.reset_style(); //仅限 hover 状态下
            },

        },
        mounted(){
            this.append_style(this.hover, "hover");
        }
    }
</script>