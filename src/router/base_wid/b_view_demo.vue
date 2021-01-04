<template>
    <article>
        <header-info v-bind="header_info" />

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
    import HeaderInfo from "@/components/header-info"
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