<template>
    <div :style="computed_style">
        <slot/>
    </div>
</template>

<script>
    import bStyle from "./styles/b-style";

    export default {
        extends: bStyle,
        name: "b-view",
        /*
        * init-data{
        *   [* styles: (参照：b-style 组件入参)],
        *   [* bg-img: "背景图"],
        * }
        * */
        props: {
            bgImg: {
                type: String,
                required: false
            },
        },
        methods: {

            //设置背景图
            $_set_bg_style(){
                let bg_img = this.bgImg;
                if(bg_img) this.computed_style.backgroundImage = `url(${bg_img})`; //背景图
            }

        },
        mounted(){
            this.$_set_bg_style();
        }
    }
</script>