<template>
    <b-view styles="flex">
        <btn-wid @on_click="$_upload" v-bind="btn_data" />
        <input type="file" style="display: none" ref="uploader" @change="$_exe_upload" :multiple="multiple"/>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"

    const desc = ["该组件用于文件上传操作，分为 “直接上传” 和 “间接（后续）上传” 2 类流程。", {
            cover: "upload-wid.png",
            title: "执行机制原理"
        }],
        extend = [],
        dependent = ["btn-wid", "b-view"],
        api = {
            event: [
                {
                    name: "on_error",
                    ef: "上传失败",
                    params: "error_code"
                },
                {
                    name: "on_change",
                    ef: "上传文件改变",
                    params: "files"
                }
            ]
        },
        init_data = `{
        /* uploadApi: "直接上传接口" */,
        /* formData: {
            "其它数据字段": "数据值",...
        } */,
        /* remoteFiles: "(model) 上传文件地址集" */,
        /* type: "上传类型，数组格式，支持：jpg、png、text...，默认为所有类型" */,
        /* size: "大小限制，默认：2M" */,
        /* multiple: "是否多文件上传，默认 false" */,
        /* btnData: "(参照：btn-wid 组件入参)" */
    }`;

    export default {
        name: "upload-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BtnWid,
            BView
        },
        model: {
            prop: "remoteFiles",
            event: "on_success"
        },
        props: {
            uploadApi: {
                type: String,
                required: false
            },
            formData: {
                type: Object,
                required: false
            },
            remoteFiles: {
                type: [Array, String],
                required: false,
                default: ()=>[]
            },
            type: {
                type: Array,
                required: false
            },
            size: {
                type: Number,
                required: false,
                default: 1024 * 1024 * 2
            },
            multiple: {
                type: Boolean,
                required: false
            },
            btnData: {
                type: Object,
                required: false
            }
        },
        data(){
            return {

                //上传按钮
                btn_data: {
                    btnText: "上传",
                    ...this.btnData,
                },

                //上传资源集合
                upload_file: {
                    files: null,
                    form_data: new FormData(),
                },

            }
        },
        computed: {

            //上传文件
            remote_files(){
                const files = this.remoteFiles;
                return typeof(files) === "string"? [files]: files;
            },

            //上传元素
            uploader(){
                return this.$refs.uploader;
            }

        },
        methods: {

            //发送上传数据
            send_upload_data(){
                for(let key in this.formData){
                    this.upload_file.form_data.append(key, this.formData[key]);
                }
                this.$axios({
                    method: 'post',
                    url: this.uploadApi,
                    data: this.upload_file.form_data,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    let datas = res.data.datas;
                    if(datas){
                        if(res.data.error > 0){ //上传数据有误
                            this.$confirm.toast(res.data.datas, 2000, "fail");
                            this.$emit("on_error", res.data.error);
                        }else{ //上传成功
                            this.uploader.value = "";
                            this.remoteFiles.length = 0;
                            datas.forEach(url=>{
                                this.remoteFiles.push(`${url}?tmp=${Math.round(Math.random() * 1000)}`);
                            })
                            this.$emit("on_success", this.remoteFiles);
                        }
                    }else{
                        this.$confirm.toast("上传服务有误!", 2000, "fail");
                    }
                })
            },

            //点击上传
            $_upload(){
                this.uploader.click();
            },

            //执行上传
            $_exe_upload(e){
                this.upload_file.files = e.currentTarget.files; //表单数据
                this.$emit("on_change", this.upload_file.files);

                //上传文件验证
                if(this.$_size_check() || (this.type && this.$_type_check())){
                    e.currentTarget.value = null;
                    return;
                };

                //直接上传
                if(this.uploadApi){
                    for(let i=0; i<this.upload_file.files.length; i++){
                        this.upload_file.form_data.append(`file_${i}`, this.upload_file.files[i]);
                    }
                    this.send_upload_data();
                }
            },

            //类型检测
            $_type_check(){
                let type,
                    name,
                    result = [].some.call(this.upload_file.files, (file=>{
                        name = file.name;
                        type = name.split(".").pop();
                        return !this.type.includes(type);
                    }));
                result && this.$confirm.toast(`${name} 类型有误!`, 2000, "fail");
                return result;
            },

            //大小检测
            $_size_check(){
                let name,
                    result = [].some.call(this.upload_file.files, (file=>{
                        name = file.name;
                        return file.size > this.size;
                    }));
                result && this.$confirm.toast(`${name} 尺寸超过限制!`, 2000, "fail");
                return result;
            }

        }
    }
</script>