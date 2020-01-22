<!--19-03-08-->
<template>
    <div class="editor-pannel-widget" v-if="pannel.state === 'show'">
        <div class="ep-w-container">
            <div class="ep-w-head">
                <h3 class="ep-w-title">
                    <small class="ep-w-text">{{cur_data.title}}</small>
                    <a class="ep-w-cancel-btn" @click="hide"><i class="ico-guanbi"></i></a>
                </h3>
                <div class="ep-w-cont" :state="cur_data.rich_text?'rich_text':''">
                    <div class="ep-w-list">
                        <div class="ep-w-item" v-for="item of cur_data.items" v-if="(item.params.only_show != true || pannel.mode === 'mod') && item.params.hide != true">

                            <!--图片上传-->
                            <p class="ep-w-item-cover" v-if="item.type === 'image'">
                                <img class="ep-w-item-img" :src="cur_data[item.id]" :name="item.id" ref="img_cover" @error="reset_cover_img" @click="img_upload">
                                <input hidden="" type="file" id="UploadCover" class="ep-w-item-hide" ref="img_uploader" @change="upload">
                                <small class="ep-w-item-notic">{{item.name}}（{{item.params.size}} Px）</small>
                            </p>

                            <!--多行文本输入-->
                            <p v-else-if="item.type === 'textarea'">
                                <span class="ep-w-item-left">{{item.name}}</span>
                                <span class="ep-w-textarea">
                                <textarea type="text" spellcheck="false" autocomplete="off" v-if="item.params.only_show!=true" v-model="cur_data[item.id]" :name="item.id" :maxlength="item.params.max_size"></textarea>
                                <span v-else>{{cur_data[item.id]}}</span>
                            </span>
                            </p>

                            <!--单行文本输入-->
                            <p v-else>
                                <span class="ep-w-item-left">{{item.name}}</span>
                                <span class="ep-w-item-right">
                                    <input class="ep-w-item-inp" type="text" autocomplete="off" spellcheck="false"
                                           v-if="item.params.only_show!=true" v-model="cur_data[item.id]"
                                           :name="item.id" :maxlength="item.params.max_size" :placeholder="item.placeholder">
                                    <span class="ep-w-item-text" v-else>{{cur_data[item.id]}}</span>
                                </span>
                            </p>

                        </div>
                    </div>
                    <div class="ep-w-rich-text" v-if="cur_data.rich_text">
                    </div>
                </div>
            </div>
            <div class="ep-w-btns">
                <a class="ep-w-btn" state="ok" @click="add_data" v-if="cur_data.api.add">{{cur_data.api.add.name || 'Ok'}}</a>
                <a class="ep-w-btn" state="ok" @click="mod_data" v-if="cur_data.api.mod">{{cur_data.api.mod.name|| 'Ok'}}</a>
                <a class="ep-w-btn" state="del" @click="del_data" v-if="cur_data.api.del">{{cur_data.api.del.name|| 'Cancel'}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "editor-pannel-widget",
        /*
        * init-data{}
        * */
        props: ["init-data"],
        data(){
            return {

                /*面板*/
                pannel: {
                    state: "hide",
                    mode: "add"
                },

                /*当前操作数据*/
                cur_data: null,

                /*上传formData*/
                upload_file: {
                    files: null,
                    form_data: new FormData(),
                },

                /*封面图*/
                cover_img: this.$B.DEFAULT_UPLOAD_IMG,

            }
        },
        methods: {

            /*显示组件*/
            /*
            * cur_data{
            *   title: "面板标题",
            *   items: [
            *      {
            *           id: "行标识",
            *           name: "行标题",
            *           [placeholder: "输入提示",]
            *           [params: {
            *               hide: "隐藏状态，但影响数据，默认显示",
            *               only_show: "修改模式纯文本展示（新增模式不可见），默认不启用",
            *               max_size: "可输入内容长度",
            *           },]
            *       },...
            *   ],
            *   //数据细节，设置状态为修改数据，否则为新增数据
            *   [details: {
            *       "items设置行标识": "数据值",
            *       ...
            *   },]
            *   //数据操作接口，设置且显示
            *   api: {
            *       [add: {
            *           api: "新增接口",
            *           name: "按钮名，默认为:Ok"
            *       },]
            *       [mod: {
            *           api: "修改接口",
            *           name: "按钮名，默认为:Ok"
            *       },]
            *       [del: {
            *           api: "删除接口",
            *           name: "按钮名，默认为:Cancel"
            *       },]
            *   }
            * }
            * */
            show(cur_data){
                this._init_data(cur_data);
                let details = this.cur_data.details;
                if(details){//修改模式
                    for(let detail_id in details){
                        this.cur_data[detail_id] = details[detail_id];
                    }
                    this.pannel.mode = "mod";
                }else{//新增模式
                    this.pannel.mode = "add";
                }

                /*动态请求富文本数据*/
                /*if(cur_data && this.initData.rich_text){
                    this.$axios.get(this.api("get_rich_text", cur_data)).then(res=>{
                        if(res.data.error == 0){
                            //this.tinymce.html = res.data.datas;
                        }
                    });
                }*/
                this.pannel.state = "show";
            },

            /*关闭组件*/
            hide(){
                this.pannel.state = "";
                this.empty_cur_data();
            },

            /*清空当前操作数据*/
            empty_cur_data(){
                //this.tinymce.html = "";            //重置富文本内容
                this.reset_cover_img();             //重置上传图预览
                this.upload_file.files = null;      //清空上传文件列表
                for(let k in this.cur_data){
                    this.cur_data[k] = "";
                }
            },

            /*新增数据*/
            add_data(){
                this.$confirm.prograss("数据添加中");
                //if(this.tinymce.html) this.cur_data.rich_text = this.tinymce.html;//处理富文本
                this.$axios.post(this.api("add"), this.cur_data).then(res=>{
                    let res_data = res.data.datas,
                        callback = ()=>{
                            this.cur_data.details.push(res_data);
                            this.hide();
                            this.$confirm.prograss("数据添加成功!", true);
                        };

                    /*处理文件上传*/
                    if(res_data){
                        if(this.upload_file.files){
                            this.exe_upload(res_data, callback);//执行上传
                        }else{
                            callback();
                        }
                    }else{
                        console.error("add data error!");
                    }

                })
            },

            /*修改数据*/
            mod_data(){
                let details = this.cur_data.details,
                    del_index = this.cur_data.INDEX;
                this.$confirm.prograss("数据修改中");
                //if(this.tinymce.html) this.cur_data.rich_text = this.tinymce.html;//处理富文本
                this.$axios.post(this.api("mod"), {//基于数据 ID 进行修改
                    id: details[del_index].Id,
                    datas: this.cur_data
                }).then(res=>{
                    let res_data = res.data.datas,
                        callback = ()=>{
                            this.$B.combine(details[del_index], res.data.datas);
                            this.hide();
                            this.$confirm.prograss("数据修改成功!", true);
                        };

                    /*处理文件上传*/
                    if(res_data){
                        if(this.upload_file.files){
                            this.exe_upload(res_data, callback);//执行上传
                        }else{
                            callback();
                        }
                    }else{
                        console.error("mod data error!");
                    }

                })
            },

            /*删除数据*/
            del_data(){
                let details = this.cur_data.details,
                    del_index = this.cur_data.INDEX;
                this.$confirm.prograss("数据删除中");
                this.$axios.post(this.cur_data.api.del, details[del_index]).then(res=>{
                    this.$confirm.prograss("数据删除成功!", true);
                    details.splice(del_index, 1);
                    this.hide();
                })
            },

            /*点击上传图片*/
            img_upload(){
                this.$refs.img_uploader[0].click();
            },

            /*重置上传图*/
            reset_cover_img(){
                let $img_cover = this.$refs.img_cover;
                if($img_cover && $img_cover[0]){
                    $img_cover[0].src = this.$B.DEFAULT_UPLOAD_IMG;
                    this.$refs.img_uploader[0].files = null;
                }
            },

            /*配置上传*/
            upload(e){
                this.upload_file.files = e.currentTarget.files;
                let file_reader = new FileReader(),
                    file = this.upload_file.files[0];
                this.upload_file.form_data.append("file", file);
                file_reader.onload = (e) => {
                    this.$refs.img_cover[0].src = e.target.result; //显示预览图
                };
                file_reader.readAsDataURL(file);
            },

            /*执行上传*/
            exe_upload(res_data, callback){
                this.$axios({
                    method: 'post',
                    url: this.api("upload", res_data),
                    data: this.upload_file.form_data,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(up_res => {
                    res_data[this.$refs.img_cover[0].name] = this.$B.random_suffix(up_res.data.datas.src);//追加封面数据
                    callback();
                })
            },

            /*执行API接口*/
            api(_api, args){
                if(!this.cur_data.api[_api]) return;
                let api_arr = this.cur_data.api[_api].split("?"),
                    api = "",
                    arg_arr = [];
                if(api_arr[1]){//有参
                    api = api_arr[0];
                    arg_arr = api_arr[1].split("&");
                    arg_arr.forEach(arg => {
                        api += ("/" + arg + "/" + args[arg]);
                    })
                }else{//无参
                    api = api_arr[0];
                }
                return api;
            },

            /*初始化数据*/
            _init_data(cur_data){
                cur_data.items.forEach(item => {
                    item.params = item.params || {}
                    item.params.hide = item.params.hide || false;               //不显示，仅影响数据
                    item.params.only_show = item.params.only_show || false;     //编辑弹窗修改模式(新增模式不可见)纯文本展示，不可编辑
                })
                this.cur_data = cur_data;
            }

        },
        watch: {
            /*initData(datas){
                this.$emit("data_loaded");
                datas.items.forEach(config => {
                    this.cur_data[config.id] = "";//初始化当前操作数据
                });

                /!*构造tinymce上传接口*!/
                if(this.tinymce.setting.images_upload_url) return;
                this.tinymce.setting.images_upload_url = this.$axios.defaults.baseURL + this.api("images_upload_url");

            }*/
        },
        mounted(){
        }
    }
</script>

<style scoped>
    @import "../../assets/css/editor-pannel-widget.css";
</style>