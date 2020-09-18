<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>btn-text</code> 属性实现按钮文字。通过 <b>on_click</b> 事件实现点击回调。</p>
            <div class="resize flex">
                <drawer-widget v-bind="data_1">
                    <div class="bg-color-lgray pad-2 round-md round-b">
                        <h5>hello javascript</h5>
                        <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                    </div>
                </drawer-widget>
            </div>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import DrawerWidget from "@/components/BTXUI/drawer/drawer-widget"

    export default {
        name: "drawer_widget_demo",
        components: {
            HeaderInfo,
            DrawerWidget
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: DrawerWidget.name,
                    ...DrawerWidget.introduce,
                },

                data_1: {
                    title: "商品管理"
                }

            }
        }
    }
</script>