<!--19-03-09-->
<template>
    <div class="uploader-widget">
        <!--预览图类型-->
        <div class="u-w-cover" v-if="preview_cover" @click="upload">
            <img class="u-w-preview" ref="Cover" v-if="preview_cover" :src="preview_cover.src" @error="_set_default_cover"/>
            <i class="ico-tianjia" v-else></i>
        </div>
        <!--缺省普通类型-->
        <div class="u-w-btn" @click="upload" v-else>
            <i class="ico-tianjia"></i>
        </div>
        <input type="file" class="u-w-file" ref="Uploader" @change="_exe_upload" :multiple="multiple"/>
    </div>
</template>

<script>
    export default {
        name: "uploader-widget",
        /*
        * init-data{
        *   upload_api: "上传接口",
        *   [direct_upload: "直接上传，默认为false",]
        *   [callback: {
        *       success: "上传成功回调函数",
        *       error: "上传失败回调函数"
        *   },]
        *   [preview_cover: {
        *       default_src: "默认预览封面（启用后仅支持上传单图片类型）"
        *   },]
        *   [type: "类型验证，支持：img、video、audio、rar",]
        *   [size_check: "大小验证",]
        *   [multiple: "多文件上传",]
        * }
        * */
        props: ["init-data"],
        data(){
            return {

                /*上传formData*/
                upload_file: {
                    files: null,
                    form_data: new FormData(),
                },

                /*上传接口*/
                upload_api: "",

                /*直接上传*/
                direct_upload: false,

                /*预览封面图*/
                preview_cover: false,

                /*多文件上传*/
                multiple: false,

                /*上传完成回调函数*/
                callback: null

            }
        },
        methods: {

            /*点击上传*/
            upload(){
                this.$refs.Uploader.click();
            },

            /*发送上传数据*/
            send_upload_data(){
                this.$axios({
                    method: 'post',
                    url: this.upload_api,
                    data: this.upload_file.form_data,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(up_res => {
                    console.log(up_res);
                    let callback = this.callback;
                    if(callback){
                        let success_callback = callback.success;
                        success_callback && success_callback(up_res);
                    }
                })
            },

            /*重置上传封面*/
            reset_cover(){
                let $img_cover = this.$refs.Cover;
                if($img_cover){
                    $img_cover.src = this.$B.DEFAULT_UPLOAD_IMG;
                    this.$refs.Uploader.files = null;
                }
            },

            /*执行上传*/
            _exe_upload(e){
                this.upload_file.files = e.currentTarget.files;
                for(let i=0; i<this.upload_file.files.length; i++){
                    this.upload_file.form_data.append("file", this.upload_file.files[i]);
                }
                if(this.direct_upload){//直接上传
                    this.send_upload_data();
                }
                if(this.preview_cover){//单图上传预览
                    this._set_cover();
                }
            },

            /*配置上传封面*/
            _set_cover(){
                let file_reader = new FileReader(),
                    file = this.upload_file.files[0];
                file_reader.onload = (e) => {
                    this.$refs.Cover.src = e.target.result; //显示预览图
                };
                file_reader.readAsDataURL(file);
            },

            /*设置默认封面*/
            _set_default_cover(e){
                let default_src = this.preview_cover.default_src;
                if(default_src){
                    e.currentTarget.src = this.preview_cover.default_src;
                }
            }

        },
        mounted(){
            this.upload_api = this.initData.upload_api;
            this.preview_cover = this.initData.preview_cover;
            this.multiple = this.preview_cover? false: this.initData.multiple; //预览封面启用后仅支持单图上传
            this.direct_upload = this.initData.direct_upload;
            this.callback = this.initData.callback;
        }
    }
</script>

<style scoped>
    @import "../../assets/css/uploader-widget.css";
</style>