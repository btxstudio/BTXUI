<!--19-02-25-->
<template>
    <div class="waterfall-column-widget">
        <ul class="wc-w-frame" :width-plan="'p_' + cols">
            <li class="wc-w-item" v-for="img of show_imgs" :id="img.item_id">
                <img class="wc-w-img" :src="img.src" :title="img.title" />
                <div class="wc-w-desc">
                    hello world
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "waterfall-column-widget",
        props: ["init-data"],
        data(){
            return {

                /*图片公共根路径*/
                common_path_root: "",

                /*全部图片*/
                imgs: [],

                /*显示图片*/
                show_imgs: [],

                /*细分列数*/
                cols: 2,

            }
        },
        methods: {

            /*初始化数据*/
            init(){
                this.common_path_root = this.initData.common_path_root;
                this.imgs = this.initData.imgs;
                this.cols = this.initData.cols || 2;
                this.load_img(0);
            },

            /*加载图片*/
            load_img(index){
                let img = this.imgs[index];
                if(!img) return;
                let $img = new Image();
                $img.onload = ()=>{
                    this.show_imgs.push({
                        title: img.title,
                        src: $img.src,
                        item_id: img.id
                    });
                    this.$nextTick(()=>{
                        this.load_img(++index);
                    })
                }
                $img.src = this.common_path_root + img.src;
            },

            /*追加显示图片*/
            append_imgs(imgs){
                let start_index = this.imgs.length;
                this.imgs = this.imgs.concat(imgs);
                this.load_img(start_index);
            },

            //【内部方法】---------------------------------------------------------------------

        },
        mounted(){
            this.init();
        }
    }
</script>

<style scoped>
    @import "../../assets/css/waterfall-column-widget.css";
</style>