<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>v-model</code> 可以初始化及双向绑定展开状态。组件交互区域继承自 <b>tag-wid</b> ，可参考相关入参：<code>tagData</code>。</p>
            <div class="resize grid">
                <div class="col-6 pad-r-3 line-r thick-1 line-lgray">
                    <drawer-wid v-bind="data_1" v-model="data_1.selected">
                        <div class="bg-color-lgray pad-2 round-sm round-b">
                            <h5>hello javascript</h5>
                            <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                            <div class="pright alpha-d5">—— btxstudio</div>
                        </div>
                    </drawer-wid>
                </div>
                <div class="col-6 pad-l-3">
                    <drawer-wid v-bind="data_1">
                        <div class="bg-color-lgray pad-2 round-sm round-b">
                            <h5>hello javascript</h5>
                            <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                            <div class="pright alpha-d5">—— btxstudio</div>
                        </div>
                    </drawer-wid>
                </div>
            </div>
            <hr>
            <p></p>
        </section>

        <!--风格化-->
        <section>
            <h5>风格化</h5>
            <p>组件 <code>tagData</code> 属性 <b>text</b> 字段支持富文本；<b>colors</b> 字段可设置配色风格。<code>iconData</code> 属性则可设置 "抽屉" 图标。</p>
            <div class="resize flex">
                <drawer-wid v-bind="data_2">
                    <div class="bg-color-lgray pad-2 round-sm round-b line-t thick-1 line-light">
                        <h5>hello javascript</h5>
                        <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                        <div class="pright alpha-d5">—— btxstudio</div>
                    </div>
                </drawer-wid>
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import DrawerWid from "@/components/BTXUI/drawer/drawer-wid"

    export default {
        name: "drawer_wid_demo",
        components: {
            HeaderInfo,
            DrawerWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: DrawerWid.name,
                    ...DrawerWid.introduce,
                },

                data_1: {
                    tagData: {
                        id: "a",
                        text: "商品详情",
                    },
                    selected: true
                },

                data_2: {
                    tagData: {
                        id: "a",
                        text: "<b class='fsize-1d4 color-dgray'>IT</b> / 官方评论",
                        colors: {
                            normal: {
                                text: "dgray",
                                bg: "lgray",
                            },
                            act: {
                                text: "blue",
                                bg: "#f4f4f4",
                            },
                            hover: {
                                text: "dark",
                                bg: "#ddd",
                            },
                        }
                    },
                    iconData: {
                        icon: "data"
                    }
                }

            }
        }
    }
</script>