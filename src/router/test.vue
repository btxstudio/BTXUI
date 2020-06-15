<template>
    <div class="max rel bg-color-lgray flex-column">
        <div class="flex-2 mrg-b-8">
            <zk2861-circle-slider-widget ref="circleSlider"
                                         :pages="slider_datas"
                                         :item-angle="36"
                                         :item-width="240"
                                         :radius="-300"
                                         :x-angle="7"
                                         :item-limit="5">
                <zk2861-slider-item-widget v-for="(page, p_i) of slider_datas" :key="p_i" :title="page.title" :slot="page.id" />
            </zk2861-circle-slider-widget>
        </div>
        <div class="flex-grow flex-5">
            <div class="abs l-4rem">
                <zk2861-slider-btn-widget dir="left" :text="items_title[0]" @on_click="$_flip('prev')" />
            </div>
            <div class="abs r-4rem">
                <zk2861-slider-btn-widget dir="right" :text="items_title[2]" @on_click="$_flip('next')" />
            </div>
        </div>
    </div>
</template>

<script>
    import Zk2861SliderBtnWidget from "@/components/pro/zk2861/zk2861-slider-btn-widget"
    import Zk2861SliderItemWidget from "@/components/pro/zk2861/zk2861-slider-item-widget"
    import Zk2861CircleSliderWidget from "@/components/pro/zk2861/zk2861-circle-slider-widget"

    export default {
        name: "test",
        components: {
            Zk2861CircleSliderWidget,
            Zk2861SliderItemWidget,
            Zk2861SliderBtnWidget,
        },
        data(){
            return {

                //轮播数据
                slider_datas: [
                    {
                        id: "a",
                        title: "测试值 javascript"
                    },
                    {
                        id: "b",
                        title: "测试值 php"
                    },
                    {
                        id: "c",
                        title: "测试值 html + css"
                    },
                    {
                        id: "d",
                        title: "测试值 python"
                    },
                    {
                        id: "e",
                        title: "测试值 c++"
                    },
                    {
                        id: "f",
                        title: "测试值 dart"
                    },
                    {
                        id: "g",
                        title: "测试值 c#"
                    },
                    {
                        id: "h",
                        title: "测试值 go"
                    },
                ],

                //按钮文字
                btn_text: [],

                //3d 轮播器
                circle_slider: null,

                //当前指针
                cur_point: 1,

                //下页标题
                next_item_title: "",

                //上页标题
                prev_item_title: "",

            }
        },
        computed: {

            //分页标题
            items_title(){
                let datas = this.slider_datas,
                    max = datas.length - 1,
                    i = this.cur_point - 1,
                    cur_title = datas[i].title,
                    prev_title = datas[i - 1 < 0? max: i - 1].title,
                    next_title = datas[i + 1 > max? 0: i + 1].title;
                return [prev_title, cur_title, next_title];
            }

        },
        methods: {

            //翻转
            $_flip(dir){
                this.circle_slider[dir]();
                this.cur_point = this.circle_slider.cur_point;
            },

            //请求数据
            $_get_data(){
                this.$axios({
                    url: "http://192.168.0.52:5666/grids_menu",
                    method: "post"
                }).then((res)=>{
                    this.slider_datas = Object.values(res.data.items).reduce((total, item)=>{
                        if(item.type === "v" && item.vcode) total.push({
                            id: item.code,
                            title: item.name
                        });
                        return total;
                    }, [])
                    console.log(this.slider_datas)
                })
            }

        },
        mounted(){
            this.circle_slider = this.$refs.circleSlider;
            //this.$_get_data();
        }
    }
</script>