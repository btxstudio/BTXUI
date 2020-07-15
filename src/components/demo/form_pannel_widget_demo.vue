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
        <p>通过 <code>pannel-styles</code> 属性可以对弹出面板进行样式自定义设置，通常设置固定高度当内容溢出时会产生滚动条效果。</p>
        <span class="color-sub flex">
            <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_toggle_pannel2">显示表单面板</a>
        </span>
        <form-pannel-widget v-model="dataList_2.pannel_info"
                            :pannel-styles="dataList_2.pannel_styles"
                            :form-data="dataList_2.data" />
        <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_2.pannel_info.selected"><b>{{key}}</b>:{{val}}</code></p>
        <p></p>

        <h5>自定义弹窗样式</h5>
        <p>通过 <code>pannel-styles</code> 属性可以对弹出面板进行样式自定义设置。此外通过 <code>pannel-data</code> 属性可以设置弹窗面板的基础布局样式，包括遮罩背景色、面板定位、面板位移、启用关闭按钮...（可参考：<code>pannel-widget</code> 组件入参）。</p>
        <span class="color-sub flex">
            <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_toggle_pannel3">显示表单面板</a>
        </span>
        <form-pannel-widget v-model="dataList_3.pannel_info"
                            :pannel-styles="dataList_3.pannel_styles"
                            :pannel-data="dataList_3.pannelData"
                            :form-data="dataList_3.data" />
        <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_3.pannel_info.selected"><b>{{key}}</b>:{{val}}</code></p>
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
                        {
                            type: "text",
                            name: "tel",
                            text: "手机",
                            maxlength: 11,
                            placeholder: "请输入您的手机号"
                        },
                        {
                            type: "text",
                            name: "email",
                            text: "邮箱",
                            placeholder: "请输入您的电子邮箱"
                        },
                        {
                            type: "text",
                            name: "addr",
                            text: "地址",
                            placeholder: "请输入您的所在地址"
                        },
                    ],
                    pannel_styles: "w-40 h-14 round-sm",
                    pannel_info: {
                        visible: false,
                        selected: {},
                    }
                },

                //基础渲染数据3
                dataList_3: {
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
                        {
                            type: "text",
                            name: "tel",
                            text: "手机",
                            maxlength: 11,
                            placeholder: "请输入您的手机号"
                        },
                        {
                            type: "text",
                            name: "email",
                            text: "邮箱",
                            placeholder: "请输入您的电子邮箱"
                        },
                        {
                            type: "text",
                            name: "addr",
                            text: "地址",
                            placeholder: "请输入您的所在地址"
                        },
                    ],
                    pannel_styles: "w-40 pad-t-4 bg-color-dgray color-lgray round-md",
                    pannel_info: {
                        visible: false,
                        selected: {},
                    },
                    pannelData: {
                        pos: 8,
                        matteColor: "rgba(255,255,255,.8)",
                        offsetStyles: { y: "f4" },
                        closeBtn: true
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

            //切换弹窗3
            $_toggle_pannel3(){
                this.dataList_3.pannel_info.visible = !this.dataList_3.pannel_info.visible;
            },

        }
    }
</script>