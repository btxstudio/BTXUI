<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础拖拽使用-->
        <section>
            <h5>基础拖拽使用</h5>
            <p>可以设计为按钮样式，并通过 <code>@on_click</code> 事件绑定点击回调，此外可以通过 <code>hover</code> 属性设置鼠标悬停样式。</p>
            <p>
                <b-drag styles="flex-5 h-3 w-10 bg-color-blue color-light round-sm"
                       hover="bg-color-red">
                    按钮
                </b-drag>
            </p>
            <hr>
            <p></p>
        </section>

        <!---->
        <section>
            <h5></h5>
            <p>通过 <code>link</code> 属性可以设置外链或 vue 组件路由；而 <code>forbid</code> 属性则可以禁用链接跳转功能。</p>
            <p>
            </p>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BDrag from "@/components/BTXUI/core/b-drag"

    export default {
        name: "b_drag_demo",
        components: {
            HeaderInfo,
            BDrag
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BDrag.name,
                    ...BDrag.introduce,
                },

                data_1: 0,

                data_2: "鼠标移出"

            }
        },
        methods: {

        }
    }
</script>