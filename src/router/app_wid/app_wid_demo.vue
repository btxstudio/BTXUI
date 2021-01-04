<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>spread</code> 属性来设置常规分布导航按钮；通过 <code>center</code> 属性则可设置居中主导航按钮；此外 <code>colors</code> 属性可设置组件色彩风格，导航按钮会基于当前路由进行高亮样式显示。</p>
            <p>通过组件 API <code>on_toggle</code> 事件可以响应点击按钮回调，自变量参数为按钮索引。</p>
            <p>【exp】：</p>
            <div class="grid pcenter resize">
                <div class="col-6 pad-h-1">
                    <div class="h-20 line line-main thick-1">
                        <app-wid v-bind="data_1.props1" />
                    </div>
                    <div class="mrg-t-1">默认深色，不含中间按钮</div>
                </div>
                <div class="col-6 pad-h-1">
                    <div class="h-20 line line-lgray thick-1">
                        <app-wid v-bind="data_1.props2" @on_toggle="show_name1" />
                    </div>
                    <div class="mrg-t-1">自定义浅色，含中间按钮及点击回调</div>
                </div>
            </div>
            <hr>
            <p></p>
        </section>

        <!--图标按钮-->
        <section>
            <h5>图标按钮</h5>
            <p>通过 <code>spread</code> 属性 <b>icon_data</b> 字段即可配置图标按钮。</p>
            <p>【exp】：</p>
            <div class="resize">
                <div class="h-20 line line-main thick-1">
                    <app-wid v-bind="data_2" />
                </div>
            </div>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import AppWid from "@/components/BTXUI/app/app-wid"

    export default {
        name: "app_wid_demo",
        components: {
            HeaderInfo,
            AppWid,
        },
        data(){
            const spread = [
                {
                    nav_id: "data",
                    icon_data: {
                        icon: "data"
                    },
                    hot_data: {
                        link: "/app_wid_demo/data"
                    },
                    text: "data",
                },
                {
                    nav_id: "download",
                    icon_data: {
                        icon: "download"
                    },
                    hot_data: {
                        link: "/app_wid_demo/download"
                    },
                    text: "download",
                },
                {
                    nav_id: "list",
                    icon_data: {
                        icon: "list"
                    },
                    hot_data: {
                        link: "/app_wid_demo/list"
                    },
                    text: "list",
                },
                {
                    nav_id: "system",
                    icon_data: {
                        icon: "system"
                    },
                    hot_data: {
                        link: "/app_wid_demo/system"
                    },
                    text: "system",
                },
            ];

            return {

                //初始化入参
                header_info: {
                    name: AppWid.name,
                    ...AppWid.introduce,
                },

                data_1: {
                    props1: {
                        spread,
                        colors: {
                            bg: "main"
                        }
                    },
                    props2: {
                        center: {
                            nav_id: "",
                            icon_data: {
                                icon: "home"
                            },
                            hot_data: {
                                link: "http://www.75sea.com"
                            }
                        },
                        spread,
                        round: false,
                        colors: {
                            bg: "lgray",
                            bar: "light",
                            center: {
                                bg: "blue",
                                line: "light"
                            },
                            text: {
                                normal: "mgray",
                                act: "blue"
                            }
                        }
                    }
                },

                data_2: {
                    center: {
                        nav_id: "",
                        icon_data: {
                            bgImg: require("@/assets/img/icons.svg")
                        },
                        bg_styles: {
                            normal: "bg-size-500% bg-pos-25%|65%"
                        }
                    },
                    spread: [
                        {
                            nav_id: "data",
                            icon_data: {
                                bgImg: require("@/assets/img/icons.svg")
                            },
                            bg_styles: {
                                normal: "bg-size-500% bg-pos-0|0",
                                act: "bg-size-500% bg-pos-0|32%"
                            },
                            hot_data: {
                                link: "/app_wid_demo/data"
                            },
                            text: "Home",
                        },
                        {
                            nav_id: "download",
                            icon_data: {
                                bgImg: require("@/assets/img/icons.svg")
                            },
                            bg_styles: {
                                normal: "bg-size-500% bg-pos-100%|0",
                                act: "bg-size-500% bg-pos-100%|32%"
                            },
                            hot_data: {
                                link: "/app_wid_demo/download"
                            },
                            text: "About",
                        }
                    ],
                    colors: {
                        bg: "main"
                    }
                }

            }
        },
        methods: {
            show_name1(nav_id){
                nav_id && this.$confirm.toast(nav_id, 2000);
            }
        }
    }
</script>