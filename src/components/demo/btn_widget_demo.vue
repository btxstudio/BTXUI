<template>
    <article>
        <h5><code>btn-widget</code></h5>
        <p>该组件用于实现按钮交互操作。</p>
        <p>组件继承：无</p>
        <p>组件依赖：无</p>
        <p>组件初始化入参：</p>
        <p></p>

        <h5>基础按钮</h5>
        <p>只需配置 <code>btn-text</code> 属性实现按钮文字即可。通过 <b>on_click</b> 事件实现点击回调。</p>
        <btn-widget btn-text="点击加一" @on_click="$_click1" />
        <p>点击次数：<code>{{dataList_1.click_count}}</code></p>
        <p></p>

    </article>
</template>

<script>
    import BtnWidget from "@/components/BTXUI/btn-widget/btn-widget"

    export default {
        name: "btn_widget_demo",
        components: { BtnWidget },
        data(){
            return {

                //基础渲染数据
                dataList_1: {
                    click_count: 0
                },

            }
        },
        methods: {

            //点击递增
            $_click1(){
                this.dataList_1.click_count++;
            }

        }
    }
</script>