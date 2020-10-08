<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础布局-->
        <section>
            <h5>基础布局</h5>
            <p><code>b-view</code> 是用于布局的基础组件，相当于 html 中 div 的作用，可以接收 <code>styles</code> 属性来应用框架封装样式体系。因此可以像添加标签类属性那样进行样式设置。</p>
            <p>【exp】：</p>
            <p>class 全局样式：<code>&lt;div class="pright fsize-1d5"&gt;hello world&lt;/div&gt;</code></p>
            <p>styles 组件样式：<code>&lt;b-view styles="pright fsize-1.5"&gt;hello world&lt;/b-view&gt;</code></p>
            <hr>
            <p></p>
        </section>

        <!--设置背景图-->
        <section>
            <h5>设置背景图</h5>
            <p>通过 <code>bgImg</code> 属性可设置背景图，之后可通过背景图相关 styles 属性进行其它样式化处理。</p>
            <p>【exp】：</p>
            <b-view styles="flex">
                <b-view styles="w-10 h-10 round-md mrg-r-9 bg-size-cover" :bg-img="require('@/assets/img/head.jpg')"></b-view>
                <b-view styles="w-10 h-10 round-md bg-size-cover" :bg-img="require('@/assets/img/head2.jpg')"></b-view>
            </b-view>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import BView from "@/components/BTXUI/core/b-view"

    const bgImg = require('@/assets/img/head.jpg');

    export default {
        name: "b_view_demo",
        components: {
            HeaderInfo,
            BView
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BView.name,
                    ...BView.introduce,
                }

            }
        }
    }
</script>