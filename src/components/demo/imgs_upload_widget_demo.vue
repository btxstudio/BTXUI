<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>默认为单图上传，通过 <code>width</code>、<code>height</code> 属性可以设置预览图尺寸，默认为 8 * 5 rem。</p>
            <div class="resize">
                <imgs-upload-widget v-bind="data_1.props" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--初始化默认封面-->
        <section>
            <h5>初始化默认封面</h5>
            <p>通过 <code>v-model</code> 可以初始化及双向绑定上传图片内容。</p>
            <div class="resize">
                <imgs-upload-widget v-bind="data_2.props" v-model="data_2.remote_file" />
            </div>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import ImgsUploadWidget from "@/components/BTXUI/imgsUpload/imgs-upload-widget"
    import server from "@/assets/server.js"

    const uploadApi = server.apis.upload;

    export default {
        name: "imgs_upload_widget_demo",
        components: {
            HeaderInfo,
            ImgsUploadWidget
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: ImgsUploadWidget.name,
                    ...ImgsUploadWidget.introduce,
                },

                //服务接口
                upload_api: uploadApi,

                data_1: {
                    props: {
                        uploadApi,
                        width: 10,
                        height: 7
                    }
                },

                data_2: {
                    props: {
                        uploadApi,
                        width: 10,
                        height: 7
                    },
                    remote_file: ["http://localhost/BTXphp/sea/static/img/test/test.jpg"]
                }

            }
        }
    }
</script>