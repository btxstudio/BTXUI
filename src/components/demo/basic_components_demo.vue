<template>
    <b-view>
        <!--导航-->
        <b-view styles="flex-between bg-color-sub round-sm pad-h-2">
            <b-icon icon="ui" styles="fsize-2" />
            <b-view styles="flex-4">
                <b-hot :hover="['color-light']" link="http://www.75sea.com">Home</b-hot>
                <b-hot styles="mrg-l-2" hover="color-light" link="/">Production</b-hot>
                <b-hot styles="mrg-l-2" hover="color-light" link="/" @on_click="$_show_nav">Service</b-hot>
                <b-hot styles="mrg-l-2" hover="color-light" @on_click="$_show_nav">Contact</b-hot>
            </b-view>
        </b-view>

        <!--主图-->
        <b-view styles="rel">
            <b-view styles="abs max flex-column flex-5">
                <b-text styles="color-light fsize-2.4">BTX·UI Frame</b-text>
                <b-text styles="color-sub fsize-1.2">build by btxstudio 2020.</b-text>
            </b-view>
            <b-img :img="require('@/assets/img/banner.jpg')" styles="round-md mrg-t-4px" />
        </b-view>


    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BText from "@/components/BTXUI/core/b-text"
    import BIcon from "@/components/BTXUI/core/b-icon"
    import BImg from "@/components/BTXUI/core/b-img"
    import BHot from "@/components/BTXUI/core/b-hot"

    export default {
        name: "basic_components_demo",
        components: {
            BView,
            BText,
            BIcon,
            BImg,
            BHot
        },
        methods: {

            $_show_nav(){
                console.log("this is a nav")
            }

        }
    }
</script>