<template>
    <input :style="computed_style" :type="type" :name="name"
           @change="check"
           v-model="value"
           autocomplete="off" />
</template>

<script>
    import bStyle from "./styles/b-style";

    export default {
        extends: bStyle,
        name: "b-input",
        /*
        * init-data{
        *   [* type: "表单元素类型"],
        *   [* name: "表单元素数据键名"],
        *   [* maxlength: "字符数上限（限输入型表单元素）"],
        *   [* placeholder: "输入提示（限输入型表单元素）"],
        *   [* readonly: "只读"],
        *   [* styles: [
        *       样式规范，基于并扩展 btx·UI 全局样式语法,...
        *   ]],
        *   [* rule: {
        *       type: "自定义正则验证，或预置正则验证（包括：required、uname、email、tel、url）",
        *       notic: "验证报错提示"
        *   }],
        * }
        * */
        model: {
            prop: "inpVal",
            event: "on_input"
        },
        props: {
            type: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            inpVal: {
                type: [String, Number],
                required: false,
                default: ""
            },
            rule: {
                type: Object,
                required: false,
            }
        },
        data(){
            return {

                //初始值
                origin_val: this.inpVal,

                //输入文字
                value: this.inpVal,

                //预置正则
                preset_rules: {
                    required: {
                        regexp: /[\w\.\-_\u4e00-\u9fa5]+/,
                        notic: "输入内容为空!"
                    },
                    tel: {
                        regexp: /^1[3~8]\d{9}$/,
                        notic: "手机号格式有误!"
                    },
                    email: {
                        regexp: /^[\w\.]+@(\w+\.)+(com|net|org|wiki|cn|cc)$/,
                        notic: "邮箱格式有误!"
                    },
                    url: {
                        regexp: /^((http|https):\/\/)?(wwww\.)?(\w+\.)+(com|net|org|wiki|cn|cc)$/,
                        notic: "url 格式有误!"
                    },
                    uname: {
                        regexp: /^[\w_]+$/,
                        notic: "请输入英文字母、数字或下划线!"
                    },
                    zh: {
                        regexp: /^[\u4e00-\u9fa5]+$/,
                        notic: "请输入中文字符!"
                    },
                    uid: {
                        regexp: /^\d{15}(\d{2}[0-9x])?$/i,
                        notic: "身份证号输入有误!"
                    }
                }

            }
        },
        watch: {
            value(val){
                this.$emit("on_input", val.trim());
            }
        },
        methods: {

            //表单验证
            check(){
                let rule = this.rule;
                if(rule){
                    let pre_rule = this.preset_rules[rule.type],
                        regexp = pre_rule? pre_rule.regexp: rule.type,
                        pre_notic = pre_rule? pre_rule.notic: "输入格式有误!",
                        val = this.inpVal;
                    this.$emit("on_check", {
                        name: this.name,
                        notic: rule.notic || pre_notic,
                        pass: regexp.test(val)
                    });
                }
            },

            //重置表单
            reset(){
                this.value = this.origin_val || "";
            }

        }
    }
</script>