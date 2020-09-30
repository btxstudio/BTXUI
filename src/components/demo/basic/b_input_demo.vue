<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础输入型表单元素-->
        <section>
            <h5>基础输入型表单元素</h5>
            <p>通过 <code>v-model</code> 可以初始化及双向绑定输入内容。其它属性如：<code>type</code>、<code>name</code>、<code>maxlength</code> 等，在使用上同 input 元素保持一致。</p>
            <p>
                <b-input styles="pad-h-1 h-3 bg-color-lgray line line-#ddd thick-1 round-sm" v-bind="data_1.props" v-model="data_1.val" />
            </p>
            <p>当前输入内容：
                <code v-if="data_1.val">{{data_1.val}}</code>
                <span v-else class="alpha-d5">暂无内容</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--初始化输入内容-->
        <section>
            <h5>初始化输入内容</h5>
            <p>
                <b-input styles="pad-h-1 h-3 bg-color-lgray line line-#ddd thick-1 round-sm" v-bind="data_2.props" v-model="data_2.val" />
            </p>
            <p>当前输入内容：
                <code v-if="data_2.val">{{data_2.val}}</code>
                <span v-else class="alpha-d5">暂无内容</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--表单输入验证-->
        <section>
            <h5>表单输入验证</h5>
            <p>通过 <code>rule</code> 属性可设置表单项验证，其中 <b>type</b> 字段可以自定义正则验证，也可以使用框架预置的一些常用正则方案，包括：emil：验证邮箱、url：验证网址、tel：验证手机号、uid：验证身份证号、zh：验证中文字符、uname：验证一般账户名，英文、数字、下划线、required：非空验证（英文、数字、下划线、中文、.）。</p>
            <div class="resize">
                <p>
                    <b-input styles="pad-h-1 h-3 bg-color-lgray line line-#ddd thick-1 round-sm"
                             v-bind="data_3.props"
                             v-model="data_3.val"
                             @on_check="$_check3"/>
                </p>
            </div>
            <p>当前输入内容：
                <code v-if="data_3.final_val">{{data_3.final_val}}</code>
                <span v-else class="alpha-d5">暂无内容</span>
            </p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import BInput from "@/components/BTXUI/core/b-input"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"

    export default {
        name: "b_input_demo",
        components: {
            HeaderInfo,
            BInput,
            BtnWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BInput.name,
                    ...BInput.introduce,
                },

                //按钮数据1
                data_1: {
                    props: {
                        type: "text",
                        name: "uname",
                        placeholder: "请输入用户名"
                    },
                    val: ""
                },

                //按钮数据2
                data_2: {
                    props: {
                        type: "text",
                        name: "uname",
                        placeholder: "请输入用户名"
                    },
                    val: "neo"
                },

                //按钮数据3
                data_3: {
                    props: {
                        type: "text",
                        name: "tel",
                        placeholder: "请输入手机号",
                        rule: {
                            type: "tel",
                            notic: "手机号输入有误!"
                        }
                    },
                    val: "",
                    final_val: ""
                },

            }
        },
        methods: {

            //表单验证
            $_check3(res){
                if(res.pass){
                    this.data_3.final_val = this.data_3.val;
                }else{
                    this.$confirm.toast(res.notic, 3000, "fail");
                }
            }

        }
    }
</script>