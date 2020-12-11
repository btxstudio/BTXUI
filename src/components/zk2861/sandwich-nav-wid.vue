<template>
    <b-view>
        <b-view :styles="`fixed max-w flex-4 pad-h-2 h-${barHeight} z9 color-${color.text} bg-color-${color.bg}`">
            <b-hot link="/" styles="grow-1">
                <b-img styles="flex h-1.4" :img="logo" />
            </b-hot>

            <!--三明治按钮-->
            <b-hot styles="fsize-1.5" @on_click="$_show">
                <b-icon icon="list" />
            </b-hot>

            <!--弹出层-->
            <b-view :styles="`max-screen flex-column z9 origin-top|right bg-color-${color.bg} trans-fast alpha-0 scale-0`"
                    :states="{
                        show: {
                            style: 'scale-1 alpha-1',
                            state: visiable
                        }
                    }">

                <!--关闭按钮-->
                <b-hot styles="abs z1 r-1rem t-1rem fsize-1.8"
                       @on_click="$_close">
                    <b-icon icon="close" />
                </b-hot>

                <!--一级导航-->
                <b-list ref="list" styles="flex-column pad-2.5">
                    <b-view styles="mrg-b-3">
                        <b-img :img="logo" styles="h-1.4" />
                    </b-view>
                    <b-hot v-for="(item,index) of navs" :key="index"
                           :link="item.link"
                           @on_click="$_close"
                           styles="trans mrg-b-2 line-b line-neutral pad-b-1 thick-1">
                        <b-text styles="bold" v-html="item.text" />

                        <!--二级导航-->
                        <b-view v-if="item.children"
                                styles="mrg-t-1.4 grid fsize-.9">
                            <b-hot v-for="(sub_item,k) of item.children" :key="k"
                                   styles="trans alpha-.6 pad-r-2 pad-b-.7"
                                   hover="alpha-1"
                                   @on_click="$_close"
                                   :link="sub_item.link">
                                · {{sub_item.text}}
                            </b-hot>
                        </b-view>
                    </b-hot>
                </b-list>

            </b-view>

        </b-view>
        <b-view :styles="`h-${barHeight}`"></b-view>
    </b-view>
</template>

<script>
    import HeaderNavWid from "./header-nav-wid"

    export default {
        extends: HeaderNavWid,
        name: "sandwich-nav-wid",
        data(){
            return {

                //导航显示状态
                visiable: false,

            }
        },
        computed: {

            //一级导航列表
            list(){
                return this.$refs.list;
            }

        },
        methods: {

            //开启导航
            $_show(){
                this.visiable = true;
                document.body.style.overflow = "hidden";
                this.list.reset();
            },

            //关闭导航
            $_close(){
                this.visiable = false;
                document.body.style.overflow = "auto";
            }

        }
    }
</script>