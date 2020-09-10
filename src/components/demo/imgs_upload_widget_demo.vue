<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>默认为单文件直接上传，仅需配置上传接口 <code>uploadApi</code>。上传结果可以通过 <code>on_error</code> 或 <code>on_success</code> 事件在回调函数参数中捕获。注：默认上传文件大小限制为 2M。</p>
            <p>测试接口：<span class="alpha-d7 color-blue">{{upload_api}}</span></p>
            <div class="resize">
                <imgs-upload-widget v-bind="data_1.props" @on_success="$_upload_success1" />
            </div>
            <p>上传文件地址：<code v-if="data_1.remote_file">{{data_1.remote_file}}</code></p>
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
                    },
                    remote_file: ""
                }

            }
        },
        methods: {

            $_upload_success1(urls){
                this.data_1.remote_file = urls[0];
            },

        }
    }
</script>