<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础单选使用-->
        <section>
            <h5>基础单选使用</h5>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tag-wid v-bind="data_1.props" v-model="data_1.selected" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--基础复选使用-->
        <section>
            <h5>基础复选使用</h5>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tag-wid v-bind="data_2.props" v-model="data_2.selected" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--双向绑定默认值-->
        <section>
            <h5>双向绑定默认值</h5>
            <p>通过 <code>v-model</code> 可以初始化及双向绑定标签状态，状态值可以是布尔值或对应的数字（true: 1, false: 0）。通过外部设置可以将单选按钮重新复位。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tag-wid v-bind="data_3.props" v-model="data_3.selected" />
            </div>
            <p class="resize flex">
                <btn-wid btnText="复位标签状态" @on_click="$_click3" />
            </p>
            <hr>
            <p></p>
        </section>

        <!--设置标签颜色-->
        <section>
            <h5>设置标签颜色</h5>
            <p>通过 <code>colors</code> 属性可以自定义色彩方案。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <tag-wid v-bind="data_4.props" v-model="data_4.selected" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import TagWid from "@/components/BTXUI/tag/tag-wid"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"

    export default {
        name: "tag_wid_demo",
        components: {
            HeaderInfo,
            TagWid,
            BtnWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: TagWid.name,
                    ...TagWid.introduce,
                },

                data_1: {
                    props: {
                        id: "a",
                        text: "单选标签"
                    },
                    selected: false
                },

                data_2: {
                    props: {
                        id: "a",
                        text: "复选标签",
                        mode: "checkbox"
                    },
                    selected: false
                },

                data_3: {
                    props: {
                        id: "a",
                        text: "单选标签",
                        actText: "选中状态",
                        mode: "radio"
                    },
                    selected: 1
                },

                data_4: {
                    props: {
                        id: "a",
                        text: "单选标签",
                        actText: "选中状态",
                        mode: "checkbox",
                        colors: {
                            normal: {
                                text: "light",
                                bg: "#444",
                            },
                            act: {
                                text: "main",
                                bg: "sub",
                            },
                            hover: {
                                text: "sub",
                                bg: "dark",
                            },
                        }
                    },
                    selected: false
                }

            }
        },
        methods: {

            $_click3(){
                this.data_3.selected = false;
            }

        }
    }
</script>