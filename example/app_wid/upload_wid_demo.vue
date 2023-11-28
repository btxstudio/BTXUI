<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>v-model</code> 可以初始化及接收上传文件内容。默认为单文件直接上传，仅需配置上传接口 <code>uploadApi</code>。注：默认上传文件大小限制为 2M。</p>
            <p>测试接口：<span class="alpha-d7 color-blue">{{upload_api}}</span></p>
            <div class="resize">
                <upload-wid v-bind="data_1.props" v-model="data_1.remote_file"/>
            </div>
            <p>上传文件地址：<code v-if="data_1.remote_file.length">{{data_1.remote_file[0]}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--限制文件类型-->
        <section>
            <h5>限制文件类型</h5>
            <p>通过 <code>type</code> 字段可以限制上传文件类型，默认可上传任意类型，数组形式设置之后仅支持包含后缀类型。此外通过 <code>btnData</code> 字段可以设置上传按钮。</p>
            <div class="resize">
                <div class="fsize-1d2">
                    <upload-wid v-bind="data_2.props" v-model="data_2.remote_file" />
                </div>
            </div>
            <p>上传文件地址：<code v-if="data_2.remote_file.length">{{data_2.remote_file[0]}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--多文件上传-->
        <section>
            <h5>多文件上传</h5>
            <p>通过 <code>multiple</code> 字段可以开启多文件上传。</p>
            <div class="resize">
                <upload-wid v-bind="data_3.props" v-model="data_3.remote_files" />
            </div>
            <p>上传文件地址：</p>
            <ol v-if="data_3.remote_files.length">
                <p v-for="file of data_3.remote_files"><code>{{file}}</code></p>
            </ol>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import UploadWid from "@/components/BTXUI/upload/upload-wid"
    import server from "@/assets/server.js"

    const uploadApi = server.apis.upload;

    export default {
        name: "upload_wid_demo",
        components: {
            HeaderInfo,
            UploadWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: UploadWid.name,
                    ...UploadWid.introduce,
                },

                //服务接口
                upload_api: uploadApi,

                data_1: {
                    props: {
                        uploadApi,
                    },
                    remote_file: []
                },

                data_2: {
                    props: {
                        uploadApi,
                        type: ["jpg", "png"],
                        btnData: {
                            btnText: "uplaod file",
                            btnRound: true,
                            btnColor: {
                                normal: {
                                    text: "light",
                                    bg: "blue",
                                    line: "none",
                                },
                                hover: {
                                    text: "#ddd",
                                    bg: "#1363e3",
                                    line: "none",
                                },
                            },
                            btnWidth: 16,
                            iconData: {
                                icon: "download"
                            }
                        }
                    },
                    remote_file: []
                },

                data_3: {
                    props: {
                        uploadApi,
                        type: ["txt"],
                        btnData: {
                            btnText: "上传 .txt 文件",
                        },
                        multiple: true
                    },
                    remote_files: []
                }

            }
        }
    }
</script>