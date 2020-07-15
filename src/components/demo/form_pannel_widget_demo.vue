<template>
    <article>
        <h5><code>form-pannel-widget</code></h5>
        <p>该组件用于自定义弹窗交互操作。</p>
        <p>组件继承：无</p>
        <p>组件依赖：<code>pannel-widget</code>、<code>form-widget</code></p>
        <p>组件初始化入参：</p>
        <p></p>

        <h5>基础使用</h5>
        <p>通过 v-model 绑定响应式表单选取数据以及面板的显示及隐藏。</p>
        <span class="color-sub flex">
            <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_toggle_pannel1">显示表单面板</a>
        </span>
        <form-pannel-widget v-model="dataList_1.pannel_info"
                            :form-data="dataList_1.data" />
        <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_1.pannel_info.selected"><b>{{key}}</b>:{{val}}</code></p>
        <p></p>

        <h5>自定义含滚动条样式弹窗</h5>
        <span class="color-sub flex">
            <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_toggle_pannel1">显示表单面板</a>
        </span>
        <form-pannel-widget v-model="dataList_2.pannel_info"
                            :pannel-styles="dataList_2.pannel_styles"
                            :form-data="dataList_2.data" />
        <p></p>

    </article>
</template>

<script>
    import FormPannelWidget from "@/components/BTXUI/form-pannel-widget/form-pannel-widget"

    export default {
        name: "form_pannel_widget_demo",
        components: { FormPannelWidget },
        data(){
            return {

                //基础渲染数据1
                dataList_1: {
                    data: [
                        {
                            type: "text",
                            name: "uname",
                            text: "账号",
                            placeholder: "请输入英文字母、下划线或数字"
                        },
                        {
                            type: "password",
                            name: "pwd",
                            text: "密码",
                            maxlength: 6,
                            placeholder: "请输入您的账号密码"
                        },
                    ],
                    pannel_info: {
                        visible: false,
                        selected: {
                            uname: "administrator"
                        },
                    }
                },

                //基础渲染数据2
                dataList_2: {
                    data: [
                        {
                            type: "text",
                            name: "uname",
                            text: "账号",
                            placeholder: "请输入英文字母、下划线或数字"
                        },
                        {
                            type: "password",
                            name: "pwd",
                            text: "密码",
                            maxlength: 6,
                            placeholder: "请输入您的账号密码"
                        },
                    ],
                    // pannel_styles: "w-40 h-50 bg-color-red",
                    pannel_styles: ["w-40", "h-50", "bg-color-red"],
                    pannel_info: {
                        visible: false,
                        selected: {
                            uname: "administrator"
                        },
                    }
                },

            }
        },
        methods: {

            //切换弹窗1
            $_toggle_pannel1(){
                this.dataList_1.pannel_info.visible = !this.dataList_1.pannel_info.visible;
            },

            //切换弹窗2
            $_toggle_pannel2(){
                this.dataList_2.pannel_info.visible = !this.dataList_2.pannel_info.visible;
            },

        }
    }
</script>