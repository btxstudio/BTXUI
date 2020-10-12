<template>
    <b-view :styles="`max pcenter flex-column color-light bg-color-${color_style.bg}`">
        <!--中部内容区域-->
        <b-list styles="grow-1">
            <router-view />
        </b-list>

        <!--底部导航栏-->
        <b-view :styles="`flex h-4.7 ${round? 'round-md round-t': ''} bg-color-${color_style.bar}`">
            <b-hot v-for="(nav,i) of navs" :key="i" v-bind="nav.hot_data"
                   @on_click="$_click(nav.nav_id)"
                   styles="grow-1 flex rel pad-v-4px">

                <!--居中主按钮-->
                <b-view v-if="nav.main"
                        :styles="`rel pad-.7 mrg-h-auto flex-5 line thick-2 w-5 h-5 round t-f1 line-${color_style.center.line} bg-color-${color_style.center.bg}`">
                    <b-icon v-bind="nav.icon_data" styles="fsize-1.7" />
                </b-view>

                <!--常规分布按钮-->
                <b-view v-else :styles="`mrg-h-auto flex-column color-${color_style.text.normal}`"
                        :states="{
                            act: {
                                state: cur_route === nav.hot_data.link,
                                style: `color-${color_style.text.act}`
                            }
                        }">
                    <b-icon v-bind="nav.icon_data" styles="grow-1 fsize-1.7" />
                    <b-text v-if="nav.text" styles="fsize-.8">{{nav.text}}</b-text>
                </b-view>

            </b-hot>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BText from "@/components/BTXUI/core/b-text"
    import BList from "@/components/BTXUI/core/b-list"
    import BHot from "@/components/BTXUI/core/b-hot"
    import BIcon from "@/components/BTXUI/core/b-icon"

    let desc = ["该组件用于快速实现手机 APP 式布局框架。"],
        extend = [],
        dependent = ["b-view", "b-text", "b-list", "b-hot", "b-icon"],
        api = {
            event: [
                {
                    name: "on_toggle",
                    ef: "导航切换点击",
                    params: "nav_id",
                }
            ]
        },
        init_data = `{
        spread: [
            {
                nav_id: "导航标识",
                icon_data: "(参照：b-icon 组件入参)",
                hot_data: "(参照：b-hot 组件入参)",
                text: "图标文字，可缺省"
            },...
        ],
        /* center: {
            nav_id: "导航标识",
            icon_data: "(参照：b-icon 组件入参)",
            hot_data: "(参照：b-hot 组件入参)"
        } */,
        /* colors: {
            bg: "内容背景色",
            bar: "导航条背景色",
            center: {
                bg: "居中导航按钮背景色",
                line: "居中导航按钮描边色"
            },
            text: {
                normal: "文字常规颜色",
                act: "文字激活颜色"
            }
        } */,
        /* round: "是否启用圆角，默认 true" */
    }`;

    export default {
        name: "app-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            BList,
            BHot,
            BIcon
        },
        props: {
            spread: {
                type: Array,
                required: true
            },
            center: {
                type: Object,
                required: false
            },
            colors: {
                type: Object,
                required: false
            },
            round: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        computed: {

            //当前路由
            cur_route(){
                return this.$route.path;
            },

            //总导航显示
            navs(){
                const spread = [ ...this.spread ];
                if(this.center) {
                    this.center.main = true;
                    spread.splice(Math.floor(spread.length / 2), 0, this.center);
                }
                return spread;
            },

            //色彩风格
            color_style(){
                return {
                    bg: "main",
                    bar: "dgray",
                    center: {
                        bg: "#444",
                        line: "neutral"
                    },
                    text: {
                        normal: "mgray",
                        act: "light"
                    },
                    ...this.colors
                }
            }

        },
        methods: {

            //导航点击
            $_click(i){
                this.$emit("on_toggle", i);
            }

        }
    }
</script>