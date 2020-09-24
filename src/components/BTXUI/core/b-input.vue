<template>
    <input :style="computed_style" :type="type" :name="name"
           @change="$_check"
           v-model="value"
           autocomplete="off" />
</template>

<script>
    import bStyle from "./styles/b-style";

    let desc = ["该组件用于实现输入型表单元素。"],
        extend = ["b-style"],
        dependent = [],
        api = {
            methods: [
                {
                    name: "check",
                    ef: "表单验证",
                    params: "-",
                    return: "{name:'表单项属性', notic:'报错提示', pass:'是否通过'}"
                }
            ],
            event: [
                {
                    name: "on_check",
                    ef: "表单输入变化",
                    params: "{name:'表单项属性', notic:'报错提示', pass:'是否通过'}",
                }
            ]
        },
        init_data = `{
        type: "表单元素类型（text：单行文本、password：密码、textarea：多行文本）",
        name: "表单元素数据键名",
        /* styles: "(参照：b-style 组件入参)" */,
        /* inpVal: "(model) 表单输入内容" */,
        /* maxlength: "字符数上限（限输入型表单元素）" */,
        /* placeholder: "输入提示（限输入型表单元素）" */,
        /* readonly: "只读" */,
        /* rule: {
            type: "自定义正则验证，或预置正则验证（包括：required、tel、email、url、uname、zh、uid）",
            notic: "验证报错提示"
        } */
    }`;

    export default {
        extends: bStyle,
        name: "b-input",
        introduce: { desc, extend, dependent, api, init_data },
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

            //监听输入
            inpVal(val){
                this.value = val;
            },

            //监听输出
            value(val){
                this.$emit("on_input", val.trim());
            }

        },
        methods: {

            //执行验证
            check(){
                let rule = this.rule;
                if(rule){
                    let pre_rule = this.preset_rules[rule.type],
                        regexp = pre_rule? pre_rule.regexp: rule.type,
                        pre_notic = pre_rule? pre_rule.notic: "输入格式有误!",
                        val = this.inpVal;
                    return {
                        name: this.name,
                        notic: rule.notic || pre_notic,
                        pass: regexp.test(val)
                    };
                }
            },

            //输入验证
            $_check(){
                this.$emit("on_check", this.check());
            },

        }
    }
</script>