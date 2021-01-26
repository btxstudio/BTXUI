<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>spread</code> 属性可以初始化组件展开状态。组件交互区域继承自 <b>tag-wid</b> ，可参考相关入参：<code>tagData</code>。</p>
            <div class="resize grid">
                <div class="col-6 pad-r-3 line-r thick-1 line-lgray">
                    <drawer-wid v-bind="data_1">
                        <div class="bg-color-lgray pad-2 round-sm round-b">
                            <h5>hello javascript</h5>
                            <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                            <div class="pright alpha-d5">—— btxstudio</div>
                        </div>
                    </drawer-wid>
                </div>
                <div class="col-6 pad-l-3">
                    <drawer-wid v-bind="data_1" :spread="true">
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
            <p>组件 <code>tagData</code> 属性 <b>text</b> 字段支持富文本；<b>colors</b> 字段可设置配色风格；<code>iconData</code> 属性可设置 "抽屉" 图标；<code>arrowFixed</code> 属性可设置 "下拉箭头" 图标位置。</p>
            <div class="resize flex">
                <drawer-wid v-bind="data_2">
                    <div class="bg-color-lgray pad-2 round-sm round-b line-t thick-1 line-light">
                        <h5>hello javascript</h5>
                        <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                        <div class="pright alpha-d5">—— btxstudio</div>
                    </div>
                </drawer-wid>
            </div>
            <hr>
            <p></p>
        </section>

        <!--启用复选框-->
        <section>
            <h5>启用复选框</h5>
            <p>组件 <code>checkbox</code> 属性可以启用标签复选框。</p>
            <div class="resize flex-column bg-color-lgray">
                <drawer-wid v-bind="data" v-for="(data,i) of data_3.list" :key="i">
                    <div class="bg-color-dgray color-mgray pad-2 round-sm round-b line-t thick-1 line-light">
                        <h5>hello {{data.tagData.text}}</h5>
                        <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                        <div class="pright alpha-d5">—— btxstudio</div>
                    </div>
                </drawer-wid>
            </div>
            <p>当前选择数据：
                <template v-if="data_3.selected.length">
                    <code v-for="data of data_3.selected">{{data}}</code>
                </template>
                <span v-else class="alpha-d4">暂无</span>
            </p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
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
                    }
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
                    },
                    arrowFixed: false
                },

                data_3: {
                    list: [
                        {
                            tagData: {
                                id: "a",
                                text: "HTML + CSS",
                            },
                            checkbox: true
                        },
                        {
                            tagData: {
                                id: "b",
                                text: "PHP + Mysql",
                            },
                            checkbox: true
                        },
                        {
                            tagData: {
                                id: "c",
                                text: "Node.js + Mongodb",
                            },
                            checkbox: true
                        }
                    ],
                    selected: []
                },

            }
        }
    }
</script>