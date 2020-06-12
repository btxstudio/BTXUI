<template>
    <div class="zk2861-circle-slider-widget light flex-layout-2" :style="el_style">
        <div class="zcs-w-box trans-fast" :style="container_style">
            <div v-for="(page, p_i) of show_items" class="abs trans" :style="slider_style[p_i]">
                <slot :name="page.id" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "zk2861-circle-slider-widget",
        /*
        * init-data{
        *   pages: "页面集合",
        *   radius: "圆环半径",
        *   x-angle: "圆环 x 轴旋转角度",
        *   item-angle: "项目夹角",
        *   item-width: "项目宽度",
        *   [* item-limit: "项目显示数量限制（最多 360 项）"],
        * }
        * */
        props: {
            pages: {
                type: Array,
                required: true
            },
            radius: {
                type: Number,
                required: true
            },
            itemAngle: {
                type: Number,
                required: true
            },
            itemWidth: {
                type: Number,
                required: true
            },
            xAngle: {
                type: Number,
                required: true
            },
            itemLimit: {
                type: Number,
                required: false
            }
        },
        data(){
            return {

                //当前轮播指针
                cur_point: 1,

            }
        },
        computed: {

            //项目总数
            item_count(){
                return this.pages.length;
            },

            //当前显示项目
            show_items(){
                let slice = this.pages.slice(this.cur_point, Math.min(360, this.itemLimit));
                return slice;
            },

            //组件 x 轴倾斜样式
            el_style(){
                return {
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${this.xAngle}deg)`
                }
            },

            //旋转容器样式
            container_style(){
                return {
                    transformStyle: "preserve-3d",
                    transformOrigin: `center center ${this.radius}px`,
                    transform: `rotateY(${-(this.cur_point - 1) * this.itemAngle}deg) translateX(-${this.itemWidth / 2}px)`
                }
            },

            //旋转项目样式
            slider_style(){
                let style = this.pages.reduce((total, val, i)=>{
                    let item_style = {
                        transformOrigin: `center center ${this.radius}px`,
                    }
                    if(this.cur_point - 1 === i){ //当前选中 item
                        item_style.transform = `rotateY(${i*this.itemAngle}deg) scale(1) translateZ(20px)`;
                        item_style.filter = "blur(0px) grayscale(0%)";
                        item_style.fontWeight = "bold";
                        item_style.opacity = 1;
                    }else{ //其它 items
                        item_style.transform = `rotateY(${i*this.itemAngle}deg) scale(.8)`;
                        item_style.filter = "blur(4px) grayscale(70%)";
                        item_style.opacity = .7;
                    }
                    total.push(item_style);
                    return total;
                }, []);
                return style;
            },

        },
        methods: {

            //后一项
            next(){
                this.cur_point++;
                if(this.cur_point > this.item_count) this.cur_point = 1;
            },

            //前一项
            prev(){
                this.cur_point--;
                if(this.cur_point < 1) this.cur_point = this.item_count;
            },

        }
    }
</script>