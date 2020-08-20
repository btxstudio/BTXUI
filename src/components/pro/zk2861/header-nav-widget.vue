<template>
    <b-view>
        <b-view :styles="`fixed max-w flex-4 pad-h-2 z9 h-${barHeight} color-${color.text} bg-color-${color.bg}`">
            <b-img :img="logo" />
            <b-hot v-for="(item,index) of navs" :key="index"
                   :link="item.link"
                   styles="trans alpha-.7 mrg-l-3 bold"
                   hover="alpha-1">
                {{item.text}}
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
        name: "header-nav-widget",
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
    }
</script>