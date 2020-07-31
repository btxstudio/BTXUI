<template>
    <article>
        <section>
            <h5><code>form-widget</code></h5>
            <p>该组件用于表单构建及操作。</p>
            <p>组件继承：无</p>
            <p>组件依赖：<code>btn-widget</code>、<code>b-view</code>、<code>b-text</code>、<code>b-hot</code>、<code>b-icon</code>、<code>b-input</code></p>
            <p>组件初始化入参：</p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>基础使用</h5>
            <p>通过 v-model 绑定响应式表单选取数据。其次可以使用 <code>form-data</code> 属性，对表单元素进行常规设置：<b>name</b> 设置数据字段键名、<b>placeholder</b> 设置提示文字、<b>maxlength</b> 设置最大字符数、<b>readonly</b> 内容只读。</p>
            <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-widget :form-data="dataList_1.data" v-model="dataList_1.selected" />
            </div>
            <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_1.selected"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>表单元素图标标题</h5>
            <p>通过 <code>layout</code> 属性的 <b>title_width</b> 字段可以设置表单项标题的固定宽度；通过 <code>form-data</code> 属性的 <b>icon</b> 字段可以设置表单项标题图标，标题图标和标题可以同时存在。</p>
            <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-widget :form-data="dataList_2.data" :layout="dataList_2.layout" v-model="dataList_2.selected" />
            </div>
            <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_2.selected"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>表单元素标题折行</h5>
            <p>通过 <code>layout</code> 属性的 <b>title_wrap</b> 字段可以设置表单项标题折行。</p>
            <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-widget :form-data="dataList_3.data" :layout="dataList_3.layout" v-model="dataList_3.selected" />
            </div>
            <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_3.selected"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>表单提交按钮</h5>
            <p>通过 <code>submit</code> 属性可设置表单"提交"按钮和其对齐方式，以及点击操作所执行的回调函数，函数中自变量为表单选择数据。<b>btnColor</b> 字段可以设置按钮颜色风格。（可参考：<code>btn-widget</code> 组件入参）。</p>
            <p>通过 <code>reset</code> 属性可设置表单"恢复"按钮，初始化表单元素数据。</p>
            <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-widget :form-data="dataList_4.data" :submit="dataList_4.submit" v-model="dataList_4.selected" />
            </div>
            <p>表单提交数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_4.submit_data"><b>{{key}}</b>:{{val}}</code></p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>表单验证</h5>
            <p>通过 <code>rule</code> 属性可设置表单项验证，其中 <b>type</b> 字段可以自定义正则验证，也可以使用框架预置的一些常用正则方案，包括：emil：验证邮箱、url：验证网址、tel：验证手机号、uid：验证身份证号、zh：验证中文字符、uname：验证一般账户名，英文、数字、下划线、required：非空验证（英文、数字、下划线、中文、.）。当执行表单"提交"时会包含验证信息以供回调处理。</p>
            <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
                <form-widget :form-data="dataList_5.data" :layout="dataList_5.layout" :submit="dataList_5.submit" v-model="dataList_5.selected" />
            </div>
            <p>表单提交数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_5.submit_data"><b>{{key}}</b>:{{val}}</code></p>
        </section>

    </article>
</template>

<script>
    import FormWidget from "@/components/BTXUI/form/form-widget"

    export default {
        name: "form_pannel_widget_demo",
        components: { FormWidget },
        data(){
            return {

                //基础渲染数据1
                dataList_1: {
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

                //基础渲染数据2
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

                //基础渲染数据3
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

                //基础渲染数据4
                dataList_4: {
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
                    ],
                    selected: {
                        uname: "Steve Jobs"
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
                            this.dataList_4.submit_data = result;
                        },
                        text: "提交表单",
                        align: "left",
                        btnColor: "dgray none #bbb light blue blue".split(" "),
                        reset: true
                    },
                    submit_data: {}
                },

                //基础渲染数据5
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
                                this.$confirm.toast(notics[0], 2000, "error");
                            }else{
                                for(let pro in form_data){
                                    val = form_data[pro];
                                    if(val) result[pro] = val;
                                }
                                this.dataList_5.submit_data = result;
                            }
                        },
                        text: "提交表单"
                    },
                    submit_data: {}
                },

            }
        }
    }
</script>