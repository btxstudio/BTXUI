<template>
    <article>
        <header-info v-bind="header_info" />

        <section>
            <h5>基础使用</h5>
            <p>通过 <code>rows</code> 属性可设置文本输入框最大行数。<code>to_html</code> 方法则可以将换行符转换为 html &lt;br&gt; 标签。</p>
            <div class="resize">
                <b-textarea ref="textarea" styles="pad-1 bg-color-lgray line line-#ddd thick-1 round-sm" v-bind="data_1.props" v-model="data_1.val" />
                <p class="flex">
                    <btn-wid @on_click="$_trans_html1" btnText="获取当前输入内容" />
                </p>
            </div>
            <p>
                <code v-if="data_1.html_str" v-html="data_1.html_str"></code>
                <span v-else class="alpha-d5">暂无内容</span>
            </p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BTextarea from "@/components/BTXUI/core/b-textarea"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"

    export default {
        name: "b_textarea_demo",
        components: {
            HeaderInfo,
            BTextarea,
            BtnWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BTextarea.name,
                    ...BTextarea.introduce,
                },

                data_1: {
                    props: {
                        name: "uname",
                        placeholder: "开始编辑您的个人博客...",
                        rows: 6
                    },
                    val: "",
                    html_str: ""
                }

            }
        },
        methods: {

            $_trans_html1(){
                this.data_1.html_str = this.$refs.textarea.to_html();
            }

        }
    }
</script>