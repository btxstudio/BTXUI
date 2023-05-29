<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>video</code> 属性绑定视频资源即可显示。</p>
            <p>
                <b-video v-bind="data_1" />
            </p>
        </section>
    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BVideo from "@/components/BTXUI/core/b-video"

    export default {
        name: "b_video_demo",
        components: {
            HeaderInfo,
            BVideo
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BVideo.name,
                    ...BVideo.introduce,
                },

                data_1: {
                    video: "https://cdn.modao.cc/video/cf/0715/new_design.mp4"
                }

            }
        }
    }
</script>