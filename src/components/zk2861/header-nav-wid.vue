<template>
    <b-view>
        <b-view :styles="`fixed max-w flex-4 pad-h-2 z9 h-${barHeight} color-${color.text} bg-color-${color.bg}`">
            <b-hot link="/">
                <b-img :img="logo" />
            </b-hot>

            <!--一级导航-->
            <b-hot v-for="(item,i) of navs" :key="i"
                   styles="rel mrg-l-4 trans alpha-.7"
                   hover="alpha-1"
                   :link="item.link"
                   @on_enter="sub_show = i"
                   @on_leave="sub_show = -1">
                <b-text styles="rel bold z2" v-html="item.text" />

                <!--二级导航-->
                <b-view v-if="item.children"
                        :styles="`pad-2 abs trans-fast flex-column ellipsis round-sm round-b alpha-0 origin-0|0 transform-scaleY(0) color-${color.text} bg-color-${color.bg}`"
                        :states="{
                        show: {
                            state: sub_show === i,
                            style: 'alpha-1 transform-scaleY(1)'
                        }
                    }">
                    <b-hot v-for="(sub_item,k) of item.children" :key="k"
                           styles="trans alpha-.5 pad-v-.4 line-b thick-1 line-neutral"
                           hover="alpha-1"
                           :link="sub_item.link">
                        · {{sub_item.text}}
                    </b-hot>
                </b-view>

            </b-hot>

        </b-view>
        <b-view :styles="`h-${barHeight}`"></b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BImg from "@/components/BTXUI/core/b-img"
    import BHot from "@/components/BTXUI/core/b-hot"

    export default {
        name: "header-nav-wid",
        components: {
            BView,
            BImg,
            BHot
        },
        props: {
            navs: {
                type: Array,
                required: true
            },
            logo: {
                type: String,
                required: false
            },
            color: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        text: "light",
                        bg: "dark"
                    }
                }
            },
            barHeight: {
                type: Number,
                required: false,
                default: 5
            }
        },
        data(){
            return {

                //下级显示状态
                sub_show: -1,

            }
        }
    }
</script>