<template>
    <article>
        <h5><code>form-widget</code></h5>
        <p>该组件用于表单构建及操作。</p>
        <p>组件继承：无</p>
        <p>组件依赖：<code>btn-widget</code></p>
        <p>组件初始化入参：</p>
        <p></p>

        <h5>基础使用</h5>
        <p>通过 v-model 绑定响应式表单选取数据。其次可以使用 <code>form-data</code> 属性，对表单元素进行常规设置：<b>name</b> 设置数据字段键名、<b>placeholder</b> 设置提示文字、<b>maxlength</b> 设置最大字符数、<b>readonly</b> 内容只读。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <form-widget :form-data="dataList_1.data" v-model="dataList_1.selected" />
        </div>
        <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_1.selected"><b>{{key}}</b>:{{val}}</code></p>
        <p></p>

        <h5>表单元素图标标题</h5>
        <p>通过 <code>layout</code> 属性的 <b>title_width</b> 字段可以设置表单项标题的固定宽度；通过 <code>form-data</code> 属性的 <b>icon</b> 字段可以设置表单项标题图标，标题图标和标题可以同时存在。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <form-widget :form-data="dataList_2.data" :layout="dataList_2.layout" v-model="dataList_2.selected" />
        </div>
        <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_2.selected"><b>{{key}}</b>:{{val}}</code></p>
        <p></p>

        <h5>表单元素标题折行</h5>
        <p>通过 <code>layout</code> 属性的 <b>title_wrap</b> 字段可以设置表单项标题折行。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <form-widget :form-data="dataList_3.data" :layout="dataList_3.layout" v-model="dataList_3.selected" />
        </div>
        <p>当前所选数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_3.selected"><b>{{key}}</b>:{{val}}</code></p>
        <p></p>

        <h5>表单提交按钮</h5>
        <p>通过 <code>submit</code> 属性可设置表单"提交"按钮和其对齐方式，以及点击操作所执行的回调函数，函数中自变量为表单选择数据。<b>btnColor</b> 字段可以设置按钮颜色风格。（可参考：<code>btn-widget</code> 组件入参）。</p>
        <div class="bg-color-lgray pad-v-1 pad-h-2 round-sm">
            <form-widget :form-data="dataList_4.data" :submit="dataList_4.submit" v-model="dataList_4.selected" />
        </div>
        <p>表单提交数据：<code class="mrg-r-d5" v-for="(val, key) of dataList_4.submit_data"><b>{{key}}</b>:{{val}}</code></p>
        <p></p>

    </article>
</template>

<script>
    import FormWidget from "@/components/BTXUI/form-widget/form-widget"

    export default {
        name: "form_pannel_widget_demo",
        components: { FormWidget },
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
                        {
                            type: "text",
                            name: "license",
                            text: "串号",
                            readonly: true
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
                            type: "text",
                            name: "uname",
                            icon: "user",
                            text: "账号",
                            placeholder: "请输入英文字母、下划线或数字"
                        },
                        {
                            type: "text",
                            name: "tel",
                            icon: "mobile",
                            maxlength: 11,
                            placeholder: "请填写您的手机号"
                        },
                        {
                            type: "password",
                            name: "pwd",
                            text: "密码",
                            maxlength: 6,
                            placeholder: "请输入您的账号密码"
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
                            type: "text",
                            name: "uname",
                            text: "账号",
                            placeholder: "请输入英文字母、下划线或数字"
                        },
                        {
                            type: "text",
                            name: "tel",
                            text: "手机号",
                            maxlength: 11,
                            placeholder: "请填写您的手机号"
                        },
                        {
                            type: "password",
                            name: "pwd",
                            text: "密码",
                            maxlength: 6,
                            placeholder: "请输入您的账号密码"
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
                    selected: {},
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
                        btnColor: "dgray none #ccc light blue none".split(" ")
                    },
                    submit_data: {}
                },

            }
        }
    }
</script>