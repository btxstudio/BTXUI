<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>v-model</code> 可以初始化及双向绑定表单选取数据以及面板的显示状态。通过 <code>pannel-title</code> 属性可以设置面板标题。</p>
            <div class="flex resize">
                <form-pannel-wid v-model="data_1.pannel_info" v-bind="data_1.props" />
                <btn-wid @on_click="$_toggle_pannel1" btnText="显示表单面板" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--自定义含滚动条样式弹窗-->
        <section>
            <h5>自定义含滚动条样式弹窗</h5>
            <p>通过 <code>pannel-styles</code> 属性可以对弹出面板进行样式自定义设置，通常设置固定高度当内容溢出时会产生滚动条效果。</p>
            <div class="flex resize">
                <form-pannel-wid v-model="data_2.pannel_info" v-bind="data_2.props" />
                <btn-wid @on_click="$_toggle_pannel2" btnText="显示表单面板" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--自定义弹窗样式-->
        <section>
            <h5>自定义弹窗样式</h5>
            <p>通过 <code>pannel-styles</code> 属性可以对弹出面板进行样式自定义设置。此外通过 <code>pannel-data</code> 属性可以设置弹窗面板的基础布局样式，包括遮罩背景色、面板定位、面板位移、启用关闭按钮...（可参考：<code>pannel-wid</code> 组件入参）。</p>
            <div class="flex resize">
                <form-pannel-wid v-model="data_3.pannel_info" v-bind="data_3.props" />
                <btn-wid @on_click="$_toggle_pannel3" btnText="显示表单面板" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--设置含提交按钮弹窗-->
        <section>
            <h5>设置含提交按钮弹窗</h5>
            <p>通过 <code>form-data</code> 属性的 <b>submit</b> 字段可以设置表单面板的"提交"按钮。（可参考：<code>form-wid</code> 组件入参）。</p>
            <div class="flex resize">
                <form-pannel-wid v-model="data_4.pannel_info" v-bind="data_4.props" />
                <btn-wid @on_click="$_toggle_pannel4" btnText="显示表单面板" />
            </div>
            <p>表单提交数据：<code class="mrg-r-d5" v-for="(val, key) of data_4.submit_data"><b>{{key}}</b>:{{val}}</code></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"
    import FormPannelWid from "@/components/BTXUI/formPannel/form-pannel-wid"

    export default {
        name: "form_pannel_wid_demo",
        components: {
            HeaderInfo,
            BtnWid,
            FormPannelWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: FormPannelWid.name,
                    ...FormPannelWid.introduce,
                },

                data_1: {
                    props: {
                        pannelTitle: "请完善表单信息",
                        formData: {
                            formData: [
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
                                }
                            ]
                        }
                    },
                    pannel_info: {
                        visible: false,
                        selected: {
                            uname: "administrator"
                        },
                    }
                },

                data_2: {
                    props: {
                        formData: {
                            formData: [
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
                                        name: "tel",
                                        maxlength: 11,
                                        placeholder: "请输入您的手机号"
                                    },
                                    text: "手机",
                                },
                                {
                                    input_data: {
                                        type: "text",
                                        name: "email",
                                        placeholder: "请输入您的电子邮箱"
                                    },
                                    text: "邮箱",
                                },
                                {
                                    input_data: {
                                        type: "text",
                                        name: "addr",
                                        placeholder: "请输入您的所在地址"
                                    },
                                    text: "地址",
                                },
                            ]
                        },
                        pannelTitle: "请完善表单信息",
                        pannelStyles: "w-40 h-17 round-sm",
                    },
                    pannel_info: {
                        visible: false,
                        selected: {},
                    }
                },

                data_3: {
                    props: {
                        formData: {
                            formData: [
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
                                        name: "tel",
                                        maxlength: 11,
                                        placeholder: "请输入您的手机号"
                                    },
                                    text: "手机",
                                },
                                {
                                    input_data: {
                                        type: "text",
                                        name: "email",
                                        placeholder: "请输入您的电子邮箱"
                                    },
                                    text: "邮箱",
                                },
                                {
                                    input_data: {
                                        type: "text",
                                        name: "addr",
                                        placeholder: "请输入您的所在地址"
                                    },
                                    text: "地址",
                                },
                            ]
                        },
                        pannelStyles: "w-40 pad-t-2 bg-color-dgray color-lgray round-md",
                        pannelData: {
                            pos: 8,
                            matteColor: "rgba(255,255,255,.8)",
                            offsetStyles: { y: "f4" },
                            closeBtn: true
                        }
                    },
                    pannel_info: {
                        visible: false,
                        selected: {},
                    }
                },

                data_4: {
                    props: {
                        formData: {
                            formData: [
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
                                        name: "tel",
                                        maxlength: 11,
                                        placeholder: "请输入您的手机号"
                                    },
                                    text: "手机",
                                }
                            ],
                            layout: {
                                title_wrap: true
                            },
                            submit: {
                                align: "center",
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
                                            text: "light",
                                            bg: "dgray",
                                            line: "dgray",
                                        },
                                        hover: {
                                            text: "light",
                                            bg: "blue",
                                            line: "#1159cd",
                                        }
                                    }
                                },
                                reset: true
                            }
                        }
                    },
                    submit_data: {},
                    pannel_info: {
                        visible: false,
                        selected: {},
                    }
                },

            }
        },
        methods: {

            //切换弹窗1
            $_toggle_pannel1(){
                this.data_1.pannel_info.visible = !this.data_1.pannel_info.visible;
            },

            //切换弹窗2
            $_toggle_pannel2(){
                this.data_2.pannel_info.visible = !this.data_2.pannel_info.visible;
            },

            //切换弹窗3
            $_toggle_pannel3(){
                this.data_3.pannel_info.visible = !this.data_3.pannel_info.visible;
            },

            //切换弹窗4
            $_toggle_pannel4(){
                this.data_4.pannel_info.visible = !this.data_4.pannel_info.visible;
            },

        }
    }
</script>