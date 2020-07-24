<template>
    <article>
        <section>
            <h5><code>btn-widget</code></h5>
            <p>该组件用于实现按钮交互操作。</p>
            <p>组件继承：无</p>
            <p>组件依赖：<code>b-hot</code></p>
            <p>组件初始化入参：</p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>基础按钮</h5>
            <p>通过 <code>btn-text</code> 属性实现按钮文字。通过 <b>on_click</b> 事件实现点击回调。</p>
            <btn-widget btn-text="点击加一" @on_click="$_click1" />
            <p>点击次数：<code>{{data_1.click_count}}</code></p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>自定义配色按钮</h5>
            <p>通过 <code>btn-color</code> 属性设置按钮颜色风格。其值参数顺序为：["文字色", "背景色", "描边色", "hover文字色", "hover背景色", "hover描边色"]。该属性可缺省，默认风格为：["dgray", "neutral", "neutral", "light", "blue", "blue"]。</p>
            <btn-widget btn-text="自定义风格按钮" :btn-color="data_2.btn_color" />
            <hr>
            <p></p>
        </section>

        <section>
            <h5>大圆角按钮</h5>
            <p>通过 <code>btn-round</code> 属性可设置按钮为大圆角效果。</p>
            <btn-widget btn-text="大圆角按钮" :btn-round="data_3.btn_round" />
            <hr>
            <p></p>
        </section>

        <section>
            <h5>定宽按钮</h5>
            <p>通过 <code>btn-width</code> 属性可设置按钮固定宽度，其默认单位为 rem。</p>
            <btn-widget btn-text="定宽按钮" :btn-width="data_4.btn_width" />
            <hr>
            <p></p>
        </section>

        <section>
            <h5>渐变按钮</h5>
            <p>通过 <code>btn-color</code> 属性设置背景色时可以使用数组结构传入多个色值来实现由左向右的线性渐变效果，一旦使用渐变色背景其 hover 样式也必须保持渐变背景色，此时纯色背景会失效。</p>
            <btn-widget btn-text="渐变按钮" :btn-color="data_5.btn_color" :btn-round="data_5.btn_round" :btn-width="data_5.btn_width" />
            <hr>
            <p></p>
        </section>

        <section>
            <h5>链接按钮</h5>
            <p>通过 <code>hot-data</code> 属性的 <b>link</b> 字段可设置按钮链接效果，<b>forbid</b> 字段实现点击禁用。</p>
            <div class="flex">
                <div class="mrg-r-1">
                    <btn-widget btn-text="跳转七武海官网" :hot-data="data_7.hot_data1" />
                </div>
                <div>
                    <btn-widget btn-text="禁用链接" :hot-data="data_7.hot_data2" />
                </div>
            </div>
        </section>

    </article>
</template>

<script>
    import BtnWidget from "@/components/BTXUI/btn-widget/btn-widget"

    export default {
        name: "btn_widget_demo",
        components: { BtnWidget },
        data(){
            return {

                //基础渲染数据1
                data_1: {
                    click_count: 0
                },

                //基础渲染数据2
                data_2: {
                    btn_color: ["light", "red", "#b7072c", "#ffcc00", "#444", "#222"]
                },

                //基础渲染数据3
                data_3: {
                    btn_round: true
                },

                //基础渲染数据4
                data_4: {
                    btn_width: 17
                },

                //基础渲染数据5
                data_5: {
                    btn_round: true,
                    btn_width: 14,
                    btn_color: ["light", ["blue", "green"], "none", "#ffcc00", ["#222", "#555"], "none"],
                },

                //基础渲染数据7
                data_7: {
                    hot_data1: {
                        link: "http://www.75sea.com",
                    },
                    hot_data2: {
                        forbid: true
                    }
                },

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