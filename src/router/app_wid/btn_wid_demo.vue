<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础按钮-->
        <section>
            <h5>基础按钮</h5>
            <p>通过 <code>btn-text</code> 属性实现按钮文字。通过 <b>on_click</b> 事件实现点击回调。</p>
            <div class="resize flex">
                <btn-wid btn-text="点击加一" @on_click="$_click1" />
            </div>
            <p>点击次数：<code>{{data_1.click_count}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--自定义配色按钮-->
        <section>
            <h5>自定义配色按钮</h5>
            <p>通过 <code>btn-color</code> 属性设置按钮颜色风格。其值参数顺序为：["文字色", "背景色", "描边色", "hover文字色", "hover背景色", "hover描边色"]。该属性可缺省，默认风格为：["dgray", "neutral", "neutral", "light", "blue", "blue"]。</p>
            <div class="resize flex">
                <btn-wid btn-text="自定义风格按钮" :btn-color="data_2.btn_color" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--大圆角按钮-->
        <section>
            <h5>大圆角按钮</h5>
            <p>通过 <code>btn-round</code> 属性可设置按钮为大圆角效果。</p>
            <div class="resize flex">
                <btn-wid btn-text="大圆角按钮" :btn-round="data_3.btn_round" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--定宽按钮-->
        <section>
            <h5>定宽按钮</h5>
            <p>通过 <code>btn-width</code> 属性可设置按钮固定宽度，其默认单位为 rem。</p>
            <div class="resize">
                <btn-wid btn-text="定宽按钮" :btn-width="data_4.btn_width" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--渐变按钮-->
        <section>
            <h5>渐变按钮</h5>
            <p>通过 <code>btn-color</code> 属性设置背景色时可以使用数组结构传入多个色值来实现由左向右的线性渐变效果，一旦使用渐变色背景其 hover 样式也必须保持渐变背景色，此时纯色背景会失效。</p>
            <div class="resize">
                <btn-wid btn-text="渐变按钮" :btn-color="data_5.btn_color" :btn-round="data_5.btn_round" :btn-width="data_5.btn_width" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--链接按钮-->
        <section>
            <h5>链接按钮</h5>
            <p>通过 <code>hotData</code> 属性的 <b>link</b> 字段可设置按钮链接效果，<b>forbid</b> 字段实现点击禁用。</p>
            <div class="resize flex">
                <div class="mrg-r-1">
                    <btn-wid btn-text="跳转七武海官网" :hot-data="data_7.hot_data1" />
                </div>
                <div>
                    <btn-wid btn-text="禁用链接" :hot-data="data_7.hot_data2" />
                </div>
            </div>
            <hr>
            <p></p>
        </section>

        <!--含图标按钮-->
        <section>
            <h5>含图标按钮</h5>
            <p>通过 <code>iconData</code> 属性可以为按钮插入图标。</p>
            <div class="resize flex">
                <btn-wid v-bind="data_8" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"

    export default {
        name: "btn_wid_demo",
        components: {
            HeaderInfo,
            BtnWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BtnWid.name,
                    ...BtnWid.introduce,
                },

                data_1: {
                    click_count: 0
                },

                data_2: {
                    btn_color: {
                        normal: {
                            text: "light",
                            bg: "red",
                            line: "#b7072c",
                        },
                        hover: {
                            text: "#ffcc00",
                            bg: "#444",
                            line: "#222",
                        },
                    }
                },

                data_3: {
                    btn_round: true
                },

                data_4: {
                    btn_width: 17
                },

                data_5: {
                    btn_round: true,
                    btn_width: 14,
                    btn_color: {
                        normal: {
                            text: "light",
                            bg: ["blue", "green"],
                            line: "none",
                        },
                        hover: {
                            text: "#ffcc00",
                            bg: ["#222", "#555"],
                            line: "none",
                        },
                    }
                },

                data_7: {
                    hot_data1: {
                        link: "http://www.75sea.com",
                    },
                    hot_data2: {
                        forbid: true
                    }
                },

                data_8: {
                    btnText: "删除",
                    iconData: {
                        icon: "del"
                    }
                }

            }
        },
        methods: {

            //点击递增
            $_click1(){
                this.data_1.click_count++;
            }

        }
    }
</script>