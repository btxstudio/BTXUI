<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <div class="resize">
            </div>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import SliderWid from "@/components/BTXUI/slider/slider-wid"

    export default {
        name: "slider_wid_demo",
        components: {
            HeaderInfo,
            SliderWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: SliderWid.name,
                    ...SliderWid.introduce,
                },

                data_1: {
                    props: {
                        width: 16,
                        height: 9,
                        notic: "要求尺寸：160 * 90"
                    }
                }

            }
        }
    }
</script>