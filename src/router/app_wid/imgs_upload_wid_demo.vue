<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>默认为单图上传，通过 <code>width</code>、<code>height</code> 属性可以设置预览图尺寸，默认为 8 * 5 rem。<code>notic</code> 属性可以设置上传提示文字。</p>
            <p>测试接口：<span class="alpha-d7 color-blue">{{upload_api}}</span></p>
            <div class="resize">
                <imgs-upload-wid v-bind="data_1.props" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--初始化默认封面-->
        <section>
            <h5>初始化默认封面</h5>
            <p>通过 <code>v-model</code> 可以初始化及双向绑定上传图片内容。</p>
            <div class="resize">
                <imgs-upload-wid v-bind="data_2.props" v-model="data_2.remote_file" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--多图上传-->
        <section>
            <h5>多图上传</h5>
            <p>通过开启 <code>multiple</code> 属性可以设置多图上传。</p>
            <div class="resize">
                <imgs-upload-wid v-bind="data_3.props"/>
            </div>
            <hr>
            <p></p>
        </section>

        <!--初始化默认多封面-->
        <section>
            <h5>初始化默认多封面</h5>
            <div class="resize">
                <imgs-upload-wid v-bind="data_4.props" v-model="data_4.remote_files" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--单图上传预览-->
        <section>
            <h5>单图上传预览</h5>
            <p>设置后续上传时，且关闭 <code>multiple</code> 属性，可进行单张图片上传前预览。</p>
            <div class="resize">
                <imgs-upload-wid v-bind="data_5.props" v-model="data_5.remote_files" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--多图上传预览-->
        <section>
            <h5>多图上传预览</h5>
            <p>设置后续上传时，且开启 <code>multiple</code> 属性，可进行多张图片上传前预览。</p>
            <div class="resize">
                <imgs-upload-wid v-bind="data_6.props" v-model="data_6.remote_files" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import ImgsUploadWid from "@/components/BTXUI/imgsUpload/imgs-upload-wid"
    import server from "@/assets/server.js"

    const uploadApi = server.apis.upload;

    export default {
        name: "imgs_upload_wid_demo",
        components: {
            HeaderInfo,
            ImgsUploadWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: ImgsUploadWid.name,
                    ...ImgsUploadWid.introduce,
                },

                //服务接口
                upload_api: uploadApi,

                data_1: {
                    props: {
                        uploadApi,
                        width: 16,
                        height: 9,
                        notic: "要求尺寸：160 * 90"
                    }
                },

                data_2: {
                    props: {
                        uploadApi,
                        width: 10,
                        height: 7
                    },
                    remote_file: ["http://localhost/BTXphp/sea/static/img/test/test.jpg"]
                },

                data_3: {
                    props: {
                        uploadApi,
                        width: 10,
                        height: 7,
                        multiple: true
                    }
                },

                data_4: {
                    props: {
                        uploadApi,
                        width: 10,
                        height: 7,
                        multiple: true
                    },
                    remote_files: [
                        "http://localhost/BTXphp/sea/static/img/test/test.jpg",
                        "http://localhost/BTXphp/sea/static/img/test/test_1.jpg"
                    ]
                },

                data_5: {
                    props: {
                        width: 10,
                        height: 7
                    },
                    remote_files: [
                        "http://localhost/BTXphp/sea/static/img/test/test.jpg"
                    ]
                },

                data_6: {
                    props: {
                        width: 10,
                        height: 7,
                        multiple: true
                    },
                    remote_files: []
                }

            }
        }
    }
</script>