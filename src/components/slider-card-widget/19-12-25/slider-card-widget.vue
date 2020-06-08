<!--19-12-25-->
<template>
    <div class="max-screen">

        <!--轮播组件-->
        <slider-widget :pages="pages" :view="slider_view" :show-dot="showDot">

            <div :slot="page.id" :key="page.id" v-for="page of pages" class="max flex flex-column flex-2 pcenter pad-h-4">
                <div class="pad-b-2 pad-h-4"><img :src="`${cover_path}${page.id}.jpg`"></div>
                <div class="fsize-2 pad-v-1" v-html="page.title"></div>
                <div class="pad-b-2" v-html="page.text"></div>
                <div>

                    <!-- 按钮组件 -->
                    <simple-btn-widget class="fsize-1d2" btn-text="进入首页"
                                       :btn-color="routerBtn.btn_color"
                                       :text-color="routerBtn.text_color"
                                       :router-link="routerBtn.link" />

                </div>
            </div>

        </slider-widget>

    </div>
</template>

<script>
    import slider from "@/components/slider-widget";
    import simpleBtn from "@/components/simple-btn-widget";

    export default {
        name: "slider-card-widget",
        /*
        * init-data{
        *   pages: [
        *       {
        *           id: "内容名",
        *           [* 其它任意字段...]
        *       }...
        *   ],
        *   show-dot: {
        *       bottom: "底边位移",
        *       color: "点颜色",
        *       act_color: "点激活颜色",
        *   },
        *   router-btn: {
        *       link: "路由地址",
        *       btn_color: "按钮颜色",
        *       text_color: "按钮文字颜色",
        *   },
        *   cover-path: "封面图路径",
        * }
        * */
        props: {
            pages: {
                type: Array,
                required: true
            },
            showDot: {
                type: Object,
                required: true
            },
            routerBtn: {
                type: Object,
                required: true
            },
            coverPath: {
                type: String,
                required: true
            }
        },
        data(){
            return {

                //轮播视图
                slider_view: {
                    height: "100%"
                }

            }
        },
        computed: {

            //封面路径
            cover_path(){
                return this.coverPath + "/"
            }

        },
        components: {
            "slider-widget": slider,
            "simple-btn-widget": simpleBtn,
        }
    }
</script>