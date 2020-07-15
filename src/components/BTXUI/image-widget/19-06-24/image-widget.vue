<!--19-06-24-->
<template>
    <img :src="cur_src" :style="cur_style" />
</template>

<script>
    export default {
        name: "image-widget",
        /*
        * init-data{
        *   def-src: "默认图",
        *   //"图片样式"
        *   image-style: {
        *       height: "图片高度",
        *       width: "图片高度",
        *       borderRadius: "图片圆角"
        *   }
        *   [ori-src: "懒加载图（源图）",]
        * }
        * */
        props: {
            defSrc: {
                type: String,
                required: true
            },
            imageStyle: {
                type: Object,
                required: true
            },
            oriSrc: {
                type: String,
                required: false
            }
        },
        data(){
            return{

                /*当前显示图片src*/
                cur_src: this.defSrc,

            }
        },
        computed: {

            /*当前显示图片样式*/
            cur_style(){
                let _style = this.imageStyle;
                _style.display = "block";
                return _style;
            }

        },
        methods: {

            /*设置图片*/
            set_src(src){
                this.cur_src = src;
            },

            /*懒加载*/
            $_lazy_load(){
                let $img = new Image();
                $img.onload = ()=>{
                    this.cur_src = this.oriSrc;
                }
                $img.src = this.oriSrc;
            },

        },
        mounted(){
            this.$_lazy_load();
        }
    }
</script>