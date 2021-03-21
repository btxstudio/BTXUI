<template>
    <textarea :style="computed_style" :type="type" :name="name"
              class="auto-scroll"
              @focus="$_focus"
              @blur="$_blur"
              @change="$_check"
              v-model="value"
              autocomplete="off"
              :rows="rows"/>
</template>

<script>
    import BInput from "./b-input";

    let desc = ["该组件用于实现多行输入型表单元素。"],
        extend = ["b-input"],
        dependent = [],
        api = {
            extend: "继承自：<code>b-input</code> 组件",
            methods: [
                {
                    name: "to_html",
                    ef: "将换行符转换为 html <br> 标签",
                    params: "-",
                    return: "html_str"
                }
            ]
        },
        init_data = `{
        "(继承自：b-input 组件入参，type 入参无效)",
        /* rows: "显示最大行数，默认 5 行" */
    }`;

    export default {
        extends: BInput,
        name: "b-textarea",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            type: {
                type: String,
                required: false,
            },
            rows: {
                type: Number,
                required: false,
                default: 5
            }
        },
        methods: {

            //将换行符转换为 html <br> 标签
            to_html(){
                return this.inpVal.replace(/[\n\r]/g, "<br>")
            }

        }
    }
</script>