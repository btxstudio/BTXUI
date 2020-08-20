<template>
    <b-view>
        <b-view :styles="`fixed max-w flex-4 pad-h-2 h-${barHeight} z9 color-${color.text} bg-color-${color.bg}`">
            <b-view styles="grow-1">
                <b-img styles="flex" :img="logo" />
            </b-view>
            <b-hot styles="fsize-1.5" @on_click="$_show">
                <b-icon icon="list" />
            </b-hot>

            <!--弹出层-->
            <b-view :styles="`max-screen flex-column pcenter pad-4 z9 origin-top|right bg-color-${color.bg} trans-fast alpha-0 scale-0`"
                    :states="{
                        show: {
                            style: 'scale-1 alpha-1',
                            state: visiable
                        }
                    }">
                <b-hot styles="abs r-1rem t-1rem fsize-1.8"
                       @on_click="$_close">
                    <b-icon icon="close" />
                </b-hot>
                <b-view styles="mrg-b-4">
                    <b-img :img="logo" />
                </b-view>
                <b-hot v-for="(item,index) of navs" :key="index"
                       :link="item.link"
                       @on_click="$_close"
                       styles="trans alpha-.7 mrg-b-2 line-b line-neutral pad-b-1 thick-1 bold"
                       hover="alpha-1">
                    {{item.text}}
                </b-hot>
            </b-view>
        </b-view>
        <b-view :styles="`h-${barHeight}`"></b-view>
    </b-view>
</template>

<script>
    import HeaderNavWidget from "./header-nav-widget"
    import BIcon from "@/components/BTXUI/core/b-icon"

    export default {
        extends: HeaderNavWidget,
        components: {
            BIcon
        },
        name: "sandwich-nav-widget",
        data(){
            return {

                //导航显示状态
                visiable: false,

            }
        },
        methods: {

            //开启导航
            $_show(){
                this.visiable = true;
                document.body.style.overflow = "hidden";
            },

            //关闭导航
            $_close(){
                this.visiable = false;
                document.body.style.overflow = "auto";
            }

        }
    }
</script>