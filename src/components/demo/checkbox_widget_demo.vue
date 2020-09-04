<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <div class="resize flex bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <checkbox-widget v-bind="data_1.props" v-model="data_1.selected" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--纯复选框使用-->
        <section>
            <h5>纯复选框使用</h5>
            <p><code>text</code> 属性可缺省，显示为纯复选框。</p>
            <div class="resize flex bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <checkbox-widget v-bind="data_2.props" v-model="data_2.selected" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import CheckboxWidget from "@/components/BTXUI/checkbox/checkbox-widget"

    export default {
        name: "checkbox_widget_demo",
        components: {
            HeaderInfo,
            CheckboxWidget
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: CheckboxWidget.name,
                    ...CheckboxWidget.introduce,
                },

                data_1: {
                    props: {
                        id: "a",
                        text: "编辑模式",
                        actText: "退出编辑"
                    },
                    selected: false
                },

                data_2: {
                    props: {
                        id: "b"
                    },
                    selected: false
                }

            }
        }
    }
</script>