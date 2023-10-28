<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>img</code> 属性绑定图像资源即可显示。</p>
            <p>
                <b-img v-bind="data_1" />
            </p>
            <hr>
            <p></p>
        </section>

        <!--样式使用-->
        <section>
            <h5>样式使用</h5>
            <p>通过 <code>styles</code> 属性可以应用框架封装样式体系。因此可以像添加标签类属性那样进行样式设置。此外独有 <code>objFit</code> 属性用以设置 object-fit 样式。</p>
            <div class="resize flex pcenter">
                <div class="mrg-r-1">
                    <b-img v-bind="data_2.props1" styles="round-sm w-11 h-6" />
                    <div>fill（默认值）</div>
                </div>
                <div class="mrg-r-1">
                    <b-img v-bind="data_2.props2" styles="round-sm w-11 h-6" />
                    <div>cover</div>
                </div>
                <div class="mrg-r-1">
                    <b-img v-bind="data_2.props3" styles="round-sm w-11 h-6 bg-color-mgray" />
                    <div>contain</div>
                </div>
                <div class="mrg-r-1">
                    <b-img v-bind="data_2.props4" styles="round-sm w-11 h-6" />
                    <div>none</div>
                </div>
                <div>
                    <b-img v-bind="data_2.props5" styles="round-sm w-11 h-6 bg-color-mgray" />
                    <div>scale-down</div>
                </div>
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BImg from "@/components/BTXUI/core/b-img"

    export default {
        name: "b_hot_demo",
        components: {
            HeaderInfo,
            BImg
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BImg.name,
                    ...BImg.introduce,
                },

                data_1: {
                    img: require('@/assets/img/head.jpg')
                },

                data_2: {
                    props1: {
                        img: require('@/assets/img/head2.jpg')
                    },
                    props2: {
                        img: require('@/assets/img/head2.jpg'),
                        objFit: "cover"
                    },
                    props3: {
                        img: require('@/assets/img/head2.jpg'),
                        objFit: "contain"
                    },
                    props4: {
                        img: require('@/assets/img/head2.jpg'),
                        objFit: "none"
                    },
                    props5: {
                        img: require('@/assets/img/head2.jpg'),
                        objFit: "scale-down"
                    }
                },

            }
        }
    }
</script>