<template>
    <img :src="src" :style="{...computed_style, objectFit: objFit}" :alt="alt">
</template>

<script>
    import bStyle from "./styles/b-style";

    let desc = ["该组件用于实现图片显示。"],
        extend = ["b-style"],
        dependent = [],
        api = {
            event: [
                {
                    name: "on_load",
                    ef: "图片加载完成",
                    params: "-",
                }
            ]
        },
        init_data = `{
        img: "图像资源",
        /* styles: "(参照：b-style 组件入参)" */,
        /* objFit: "object-fit 样式值，默认：cover" */,
        /* defaultSrc: "默认图，加载失败或初始加载时显示" */,
        /* alt: "图片说明提示" */
    }`;

    export default {
        extends: bStyle,
        name: "b-img",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            img: {
                type: String,
                required: false
            },
            objFit: {
                type: String,
                required: false,
                default: "cover"
            },
            defaultSrc: {
                type: String,
                required: false
            },
            alt: {
                type: String,
                required: false
            }
        },
        data(){
            return {

                //图像显示地址
                src: this.defaultSrc,

            }
        },
        watch: {

            //监听图像源
            img(){
                this.$_load();
            }

        },
        methods: {

            //图像源加载
            $_load(){
                const img = new Image();
                img.onload = ()=>{
                    this.src = this.img;
                    this.$emit("on_load");
                }
                img.src = this.img;
            }

        },
        mounted(){
            this.$_load();
        }
    }
</script>