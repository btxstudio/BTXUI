<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>v-model</code> 可以初始化及双向绑定表单选取数据。其次可以使用 <code>form-data</code> 属性，对表单元素进行常规设置：<b>name</b> 设置数据字段键名、<b>placeholder</b> 设置提示文字、<b>maxlength</b> 设置最大字符数、<b>readonly</b> 内容只读。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-wid :form-data="data_1.data" v-model="data_1.selected" />
            </div>
            <p class="flex resize">
                <btn-wid btnText="设置密码" @on_click="$_set_pwd1" />
            </p>
            <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of data_1.selected"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--表单元素图标标题-->
        <section>
            <h5>表单元素图标标题</h5>
            <p>通过 <code>layout</code> 属性的 <b>title_width</b> 字段可以设置表单项标题的固定宽度；通过 <code>form-data</code> 属性的 <b>icon</b> 字段可以设置表单项标题图标，标题图标和标题可以同时存在。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-wid :form-data="dataList_2.data" :layout="dataList_2.layout" v-model="dataList_2.selected" />
            </div>
            <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_2.selected"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--表单元素标题折行-->
        <section>
            <h5>表单元素标题折行</h5>
            <p>通过 <code>layout</code> 属性的 <b>title_wrap</b> 字段可以设置表单项标题折行。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-wid :form-data="dataList_3.data" :layout="dataList_3.layout" v-model="dataList_3.selected" />
            </div>
            <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_3.selected"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--其它表单元素及提交-->
        <section>
            <h5>其它表单元素及提交</h5>
            <p>通过 <code>submit</code> 属性可设置表单"提交"按钮和其对齐方式，以及点击操作所执行的回调函数，函数中自变量为表单选择数据。<b>btnColor</b> 字段可以设置按钮颜色风格。（可参考：<code>btn-wid</code> 组件入参）。通过 <code>reset</code> 属性可设置表单"恢复"按钮，初始化表单元素数据。</p>
            <p>通过 <code>select</code> 属性可设置下拉框表单元素；<code>input_data</code> 属性 <b>type="textarea"</b> 可设置多行文本输入表单元素；<code>imgs</code> 属性可设置图片上传。</p>
            <p>通过 <code>colors</code> 属性可设置输入型表单元素及下拉列表的颜色风格，包括常规（normal）和激活（focus）两种状态。注：下拉列表无激活状态。通过 <code>baseLine</code> 属性可设置基线模式，一旦使用 <code>colors</code> 属性的 <b>line</b> 字段仅影响下划线颜色。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-wid v-bind="data_4.props" v-model="data_4.selected" />
            </div>
            <p>表单提交数据：<code class="mrg-r-d5" v-for="(val, key) of data_4.submit_data"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--表单验证-->
        <section>
            <h5>表单验证</h5>
            <p>通过 <b>input-wid</b> 组件的 <code>rule</code> 属性可设置表单项验证，当执行表单"提交"时会包含验证信息以供回调处理。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-wid :form-data="dataList_5.data" :layout="dataList_5.layout" :submit="dataList_5.submit" v-model="dataList_5.selected" />
            </div>
            <p>表单提交数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_5.submit_data"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <!--表单项只读-->
        <section>
            <h5>表单项只读</h5>
            <p>通过 <b>input-wid</b> 组件的 <code>readonly</code> 属性可设置表单项只读，此外通过 API <code>set_only_read</code> 和 <code>set_write</code> 方法可以动态设置表单项只读或可写。</p>
            <div class="resize bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-wid ref="form6" v-bind="data_6.props" v-model="data_6.selected" />
            </div>
            <div class="flex resize mrg-t-1">
                <btn-wid btnText="设置账号只读" @on_click="$_set_form6_readonly" />
                <div class="mrg-l-1">
                    <btn-wid btnText="设置账号可写" @on_click="$_set_form6_write" />
                </div>
            </div>
            <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of data_6.selected"><b>{{key}}</b>:{{val}}</code></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import FormWid from "@/components/BTXUI/form/form-wid"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"
    import server from "@/assets/server.js"

    const uploadApi = server.apis.upload;

    export default {
        name: "form_pannel_wid_demo",
        components: {
            HeaderInfo,
            FormWid,
            BtnWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: FormWid.name,
                    ...FormWid.introduce,
                },

                data_1: {
                    data: [
                        {
                            input_data: {
                                type: "text",
                                name: "uname",
                                placeholder: "请输入英文字母、下划线或数字"
                            },
                            text: "账号",
                        },
                        {
                            input_data: {
                                type: "password",
                                name: "pwd",
                                maxlength: 6,
                                placeholder: "请输入您的账号密码"
                            },
                            text: "密码",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "license",
                                readonly: true
                            },
                            text: "串号",
                        },
                    ],
                    selected: {
                        uname: "administrator",
                        license: 745829
                    },
                },

                dataList_2: {
                    data: [
                        {
                            input_data: {
                                type: "text",
                                name: "uname",
                                placeholder: "请输入英文字母、下划线或数字"
                            },
                            icon: "user",
                            text: "账号",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "tel",
                                maxlength: 11,
                                placeholder: "请填写您的手机号"
                            },
                            icon: "mobile",
                        },
                        {
                            input_data: {
                                type: "password",
                                name: "pwd",
                                maxlength: 6,
                                placeholder: "请输入您的账号密码"
                            },
                            text: "密码",
                        },
                    ],
                    layout: {
                        title_width: 7
                    },
                    selected: {},
                },

                dataList_3: {
                    data: [
                        {
                            input_data: {
                                type: "text",
                                name: "uname",
                                placeholder: "请输入英文字母、下划线或数字"
                            },
                            text: "账号",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "tel",
                                maxlength: 11,
                                placeholder: "请填写您的手机号"
                            },
                            text: "手机号",
                        },
                        {
                            input_data: {
                                type: "password",
                                name: "pwd",
                                maxlength: 6,
                                placeholder: "请输入您的账号密码"
                            },
                            text: "密码",
                        },
                    ],
                    layout: {
                        title_wrap: true
                    },
                    selected: {},
                },

                data_4: {
                    props: {
                        formData: [
                            {
                                imgs: {
                                    name: "cover",
                                    imgs_upload_data: {}
                                },
                                text: "头像",
                            },
                            {
                                input_data: {
                                    type: "text",
                                    name: "uname",
                                    placeholder: "请输入英文字母、下划线或数字",
                                    rule: {
                                        type: "uname",
                                        notic: "账号输入内容不合法"
                                    }
                                },
                                text: "账号",
                            },
                            {
                                select: {
                                    name: "city",
                                    select_data: {
                                        listData: [
                                            {
                                                text: "北京",
                                                val: "bj"
                                            },
                                            {
                                                text: "上海",
                                                val: "sh"
                                            },
                                            {
                                                text: "深圳",
                                                val: "sz"
                                            }
                                        ],
                                        placeholder: "请选择所在城市",
                                        colors: {
                                            text: "mgray"
                                        }
                                    }
                                },
                                text: "所在城市",
                            },
                            {
                                input_data: {
                                    type: "text",
                                    name: "zh_name",
                                    placeholder: "请输入真实中文名",
                                    rule: {
                                        type: "zh"
                                    }
                                },
                                text: "真实姓名",
                            },
                            {
                                input_data: {
                                    type: "textarea",
                                    name: "about",
                                    placeholder: "请输入个人简介...",
                                    rows: 5
                                },
                                text: "关于自己",
                            }
                        ],
                        layout: {
                            title_width: 10
                        },
                        submit: {
                            callback: (form_data)=>{
                                let result = {},
                                    val;
                                for(let pro in form_data){
                                    val = form_data[pro];
                                    if(val) result[pro] = val;
                                }
                                if(!Object.values(result).join("")) result = { result: "暂无数据" };
                                this.data_4.submit_data = result;
                            },
                            btn_data: {
                                btnText: "提交表单",
                                btnColor: {
                                    normal: {
                                        text: "dgray",
                                        bg: "light",
                                        line: "none",
                                    },
                                    hover: {
                                        text: "light",
                                        bg: "blue",
                                        line: "none",
                                    },
                                }
                            },
                            reset: true
                        },
                        baseLine: true,
                        colors: {
                            normal: {
                                text: "mgray",
                                bg: "none",
                                line: "neutral",
                            },
                            focus: {
                                text: "blue",
                                bg: "light",
                            }
                        }
                    },
                    selected: {
                        uname: "Steve Jobs"
                    },
                    submit_data: {}
                },

                dataList_5: {
                    data: [
                        {
                            input_data: {
                                type: "text",
                                name: "uname",
                                placeholder: "请输入英文字母、下划线或数字",
                                rule: {
                                    type: "uname",
                                    notic: "账号输入内容不合法"
                                }
                            },
                            text: "账号",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "zh_name",
                                placeholder: "请输入真实中文名",
                                rule: {
                                    type: "zh"
                                }
                            },
                            text: "真实姓名",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "uid",
                                placeholder: "请输入身份证号",
                                rule: {
                                    type: "uid"
                                }
                            },
                            text: "身份证号",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "email",
                                placeholder: "请输入您的邮箱",
                                rule: {
                                    type: "email"
                                }
                            },
                            text: "邮箱",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "url",
                                placeholder: "请输入您的个人网址",
                                rule: {
                                    type: "url"
                                }
                            },
                            text: "网址",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "tel",
                                placeholder: "请输入您的手机号",
                                maxlength: 11,
                                rule: {
                                    type: "tel"
                                }
                            },
                            text: "手机号",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "creed",
                                placeholder: "请输入您的座右铭",
                                rule: {
                                    type: "required"
                                }
                            },
                            text: "座右铭",
                        },
                        {
                            input_data: {
                                type: "text",
                                name: "recommend",
                                placeholder: "请输入至少两个推荐人，以顿号相隔",
                                rule: {
                                    type: /\w+(、\w)+/,
                                    notic: "推荐人格式有误!"
                                }
                            },
                            text: "推荐人"
                        },
                    ],
                    selected: {},
                    layout: {
                        title_width: 10
                    },
                    submit: {
                        callback: (form_data, check_result)=>{
                            let notics = Object.values(check_result),
                                result = {},
                                val;
                            if(notics.length){
                                this.$confirm.toast(notics[0], 2000, "fail");
                            }else{
                                for(let pro in form_data){
                                    val = form_data[pro];
                                    if(val) result[pro] = val;
                                }
                                this.dataList_5.submit_data = result;
                            }
                        },
                        align: "center",
                        btn_data: {
                            btnText: "提交表单",
                            btnColor: {
                                normal: {
                                    text: "#fff",
                                    bg: "dgray",
                                    line: "none",
                                },
                                hover: {
                                    text: "light",
                                    bg: "blue",
                                    line: "none",
                                }
                            },
                            btnWidth: 14,
                            btnRound: true
                        },
                    },
                    submit_data: {}
                },

                data_6: {
                    props: {
                        formData: [
                            {
                                input_data: {
                                    type: "text",
                                    name: "uname",
                                    placeholder: "请输入英文字母、下划线或数字",
                                    rule: {
                                        type: "uname",
                                        notic: "账号输入内容不合法"
                                    }
                                },
                                text: "账号",
                            },
                            {
                                input_data: {
                                    type: "text",
                                    name: "zh_name",
                                    placeholder: "请输入真实中文名",
                                    rule: {
                                        type: "zh"
                                    }
                                },
                                text: "真实姓名",
                            },
                            {
                                input_data: {
                                    type: "text",
                                    name: "uid",
                                    placeholder: "请输入身份证号",
                                    readonly: true,
                                    rule: {
                                        type: "uid"
                                    }
                                },
                                text: "身份证号",
                            }
                        ],
                        colors: {
                            normal: {
                                text: "dgray",
                                bg: "light"
                            },
                            focus: {
                                text: "blue",
                                bg: "rgba(255,255,255,.5)"
                            }
                        },
                        layout: {
                            title_width: 10
                        },
                    },
                    selected: {uid: "510122198708103372"},
                },

            }
        },
        methods: {

            $_set_pwd1(){
                this.data_1.selected = {
                    uname: "administrator",
                    pwd: "123456",
                    license: 745829
                };
            },

            $_set_form6_readonly(){
                this.$refs.form6.set_only_read("uname");
            },

            $_set_form6_write(){
                this.$refs.form6.set_write("uname");
            }
            
        }
    }
</script>