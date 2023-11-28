<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础按钮-->
        <section id="sec_1">
            <h5>基础按钮</h5>
            <p>可以设计为按钮样式，并通过 <code>@on_click</code> 事件绑定点击回调，此外可以通过 <code>hover</code> 属性设置鼠标悬停样式。</p>
            <p>
                <b-hot styles="flex-5 h-3 w-10 bg-color-blue color-light round-sm"
                       hover="bg-color-red"
                       @on_click="$_click1">
                    按钮
                </b-hot>
            </p>
            <p>当前计数：<code>{{data_1}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--基础链接-->
        <section>
            <h5>基础链接</h5>
            <p>通过 <code>link</code> 属性可以设置外链或 vue 组件路由；而 <code>forbid</code> 属性则可以禁用链接跳转功能。</p>
            <p>
                <b-hot hover="color-blue" link="http://baidu.com">baidu.com</b-hot>
                <b-hot class="mrg-l-3" hover="color-mgray" link="http://baidu.com" :forbid="true">被禁用的百度链接</b-hot>
            </p>
            <hr>
            <p></p>
        </section>

        <!--hover 鼠标悬停效果-->
        <section>
            <h5>hover 鼠标悬停效果</h5>
            <p>通过 <code>@on_enter</code> 事件绑定鼠标移入回调；<code>@on_leave</code> 事件绑定鼠标移出回调。</p>
            <p>
                <b-hot styles="flex-5 h-3 w-10 bg-color-lgray round-sm"
                       hover="bg-color-blue color-light"
                       @on_enter="$_enter3" @on_leave="$_leave3">
                    {{data_3}}
                </b-hot>
            </p>
            <hr>
            <p></p>
        </section>

        <!--内链跳转定位-->
        <section>
            <h5>内链跳转定位</h5>
            <p>通过 <code>link</code> 属性可配置内部链接跳转。其中 <b>chapter_id</b> 字段决定跳转元素位置。<b>chapter_link_data</b> 字段则包含了：ani_speed：平移动画缓动速率、offset：位移偏移、callback：滚动完成回调函数（直接硬跳转无效）。</p>
            <p class="flex">
                <b-hot styles="flex-5 h-3 w-14 bg-color-lgray round-sm"
                       hover="bg-color-blue color-light"
                       :link="data_4.no_1">
                    滑至 "基础按钮"
                </b-hot>
                <b-hot styles="flex-5 h-3 w-14 bg-color-lgray round-sm mrg-l-1"
                       hover="bg-color-blue color-light"
                       :link="data_4.no_2">
                    跳至 "基础按钮"
                </b-hot>
            </p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BHot from "@/components/BTXUI/core/b-hot"

    export default {
        name: "b_hot_demo",
        components: {
            HeaderInfo,
            BHot
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BHot.name,
                    ...BHot.introduce,
                },

                //按钮数据1
                data_1: 0,

                //按钮数据3
                data_3: "鼠标移出",

                //按钮数据4
                data_4: {
                    no_1: {
                        chapter_id: "sec_1",
                        chapter_link_data: {
                            ani_speed: .3,
                            offset: -40,
                            callback: ()=>{
                                this.$confirm.toast("已滚动至 \"基础按钮\" 位置")
                            }
                        }
                    },
                    no_2: {
                        chapter_id: "sec_1",
                        chapter_link_data: {
                            ani_speed: 0,
                        }
                    },
                },

            }
        },
        methods: {

            //点击按钮1
            $_click1(){
                this.data_1++;
            },

            //鼠标移入按钮3
            $_enter3(){
                this.data_3 = "鼠标移入";
            },

            //鼠标移出按钮3
            $_leave3(){
                this.data_3 = "鼠标移出";
            },

        }
    }
</script>