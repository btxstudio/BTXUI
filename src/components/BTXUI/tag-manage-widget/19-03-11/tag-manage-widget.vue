<!--19-03-11-->
<template>
    <div class="tag-manage-widget">
        <ul class="tm-w-container">
            <li class="tm-w-tag" v-for="(tag,i) of tags" :state="tag.state" @click="_start_mod_tag_state(tag, $event)">
                <span v-show="tag.state === 'read'">{{tag.text}}</span>
                <input class="tm-w-inp" type="text" spellcheck="false" v-model="tag.text" :maxlength="tag_word_limit" @input="_deal_space_word(tag, $event)"/>
                <span class="tm-w-del" @click="_del_tag(i, $event)"><i class="ico-guanbi"></i></span>
            </li>
            <li class="tm-w-tag" type="add" :state="add_btn_state" @click="_start_add_tag_state">
                <input class="tm-w-inp" type="text" spellcheck="false" placeholder="填写标签名" v-model="add_tag_text" :maxlength="tag_word_limit" @input="_deal_space_word('ADD_MODE', $event)"/>
                <i class="ico-tianjia" v-show="add_btn_state === ''" ></i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "tag-manage-widget",
        /*
        * init-data{
        *   tags: ["标签名",...],
        *   [tag_word_limit: "标签内容文字数上限（默认无限）",]
        *   [count_limit: "标签数上限（默认无限）",]
        *   //自动存储启用后，增、删、改标签操作将会在执行后一定时间后自动调用服务端接口传输“标签值集合”数据
        *   [auto_save: {
        *       api: "服务端接口",
        *       [delay: "请求接口延迟时间（默认6秒）",]
        *       [callback: "请求结果处理回调函数",]
        *   },]
        * }
        * */
        props: ["init-data"],
        data(){
            return {

                /*标签集合*/
                tags: null,

                /*新增标签按钮状态*/
                add_btn_state: "",

                /*新增标签内容*/
                add_tag_text: "",

                /*当前修改标签*/
                cur_mod_tag: null,

                /*标签内容字数上限*/
                tag_word_limit: "",

                /*标签数上限*/
                count_limit: "",

                /*自动存储*/
                auto_save: {
                    enabled: false,
                    delay: 6000,
                    timeout: null
                }

            }
        },
        methods: {

            /*获取标签值集合*/
            get_tags(){
                let tags = [];
                this.tags.forEach(tag => {
                    tags.push(tag.text);
                })
                return tags;
            },

            /*初始化数据*/
            _init_data(){
                this.tags = [];
                this.initData.tags.forEach(tag => {
                    this.tags.push({
                        text: tag,
                        state: "read"
                    })
                });

                /*配置自动存储*/
                let auto_save = this.initData.auto_save;
                if(auto_save){
                    for(let pro in auto_save){
                        this.auto_save[pro] = auto_save[pro];
                    }
                    this.auto_save.enabled = true;
                }

            },

            /*开启修改标签状态*/
            _start_mod_tag_state(tag, e){
                e.stopPropagation();
                if(tag.state === "read"){
                    this._reset_tag_state();
                    if(this.add_btn_state === "edit") this.add_btn_state = "";
                    tag.state = "edit";
                    this.cur_mod_tag = tag;
                    this._edit_tag_inp_focus(e);
                }
            },

            /*开启新增标签状态*/
            _start_add_tag_state(e){
                e.stopPropagation();
                if(this.add_btn_state == ""){
                    this._reset_tag_state();
                    this.add_btn_state = "edit";
                    this._edit_tag_inp_focus(e);
                }
            },

            /*编辑标签输入表单聚焦*/
            _edit_tag_inp_focus(e){
                this.$nextTick(()=>{
                    e.currentTarget.querySelector(".tm-w-inp").focus();
                })
            },

            /*取消编辑标签状态*/
            _end_edit_tag_state(){
                if(this.add_btn_state === "edit" || (this.cur_mod_tag && this.cur_mod_tag.state === "edit")){
                    this._add_tag();
                    this._deal_tag_count_limit();
                    this._reset_tag_state();
                    this._auto_save();
                }
            },

            /*重置标签编辑与只读状态*/
            _reset_tag_state(){
                clearTimeout(this.auto_save.timeout);
                let cur_mod_tag = this.cur_mod_tag;
                if(cur_mod_tag) cur_mod_tag.state = "read";//取消“修改”
            },

            /*新增标签*/
            _add_tag(){
                let tag_text = this.add_tag_text;
                if(/^\S+$/g.test(tag_text)){
                    this.tags.push({
                        text: tag_text,
                        state: "read"
                    })
                }
                this.add_tag_text = "";
            },

            /*删除标签*/
            _del_tag(tag_index, e){
                e.stopPropagation();
                this.tags.splice(tag_index, 1);
                this._end_edit_tag_state();
            },

            /*标签数上限判断*/
            _deal_tag_count_limit(){
                this.add_btn_state = this.tags.length >= this.count_limit? "disabled": "";
            },

            /*禁止空字符输入*/
            _deal_space_word(mode, e){
                if(e.data == " "){
                    if(mode === "ADD_MODE"){//新增模式
                        this.add_tag_text = this.add_tag_text.split(" ").join("");
                    }else if(typeof mode === "object"){//修改模式
                        let tag = mode;
                        tag.text = tag.text.split(" ").join("");
                    }
                }
            },

            /*自动存储*/
            _auto_save(){
                if(this.auto_save.enabled === true){
                    let callback = this.auto_save.callback;
                    this.auto_save.timeout = setTimeout(()=>{
                        this.$axios.post(this.auto_save.api, this.get_tags()).then((res) => {
                            callback && callback(res);
                        })
                    }, this.auto_save.delay)
                }
            }

        },
        beforeMount(){
            this.tag_word_limit = this.initData.tag_word_limit;
            this.count_limit = this.initData.count_limit;
            this._init_data();
            this._deal_tag_count_limit();
        },
        mounted(){
            document.querySelector("body").addEventListener("click", () => {
                this._end_edit_tag_state();
            })
        }
    }
</script>

<style scoped>
    @import "../../assets/css/tag-manage-widget.css";
</style>