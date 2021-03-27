<template>
    <pannel-wid v-bind="pannel_prams" v-model="pannelInfo.visible">
        <b-view :styles="pannel_styles">
            <b-view v-if="pannelTitle" styles="pad-l-2">
                <b-view styles="line-b thick-1 pad-v-.7 line-neutral">{{pannelTitle}}</b-view>
            </b-view>
            <b-list styles="pad-2">
                <form-wid ref="former" v-bind="formData" v-model="pannelInfo.selected" />
            </b-list>
        </b-view>
    </pannel-wid>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BList from "@/components/BTXUI/core/b-list";
    import PannelWid from "@/components/BTXUI/pannel/pannel-wid";
    import FormWid from "@/components/BTXUI/form/form-wid";

    const desc = ["该组件用于自定义弹窗交互操作。"],
        extend = [],
        dependent = ["form-wid", "pannel-wid", "b-list", "b-view"],
        api = {
            methods: [
                {
                    name: "set_only_read",
                    ef: "设置表单项只读",
                    params: "name",
                    return: "-"
                },
                {
                    name: "set_write",
                    ef: "设置表单项可写",
                    params: "name",
                    return: "-"
                }
            ]
        },
        init_data = `{
        pannelInfo: "（model）{
            visible: "面板显示状态",
            selected: {
                name（所选表单元素键名）: value（所选表单元素键值）,...
            }
        }",
        formData: "(参照：form-wid 组件入参)",
        /* pannelTitle: "面板标题" */,
        /* pannelStyles: "面板样式" */,
        /* pannelData: "(参照：pannel-wid 组件入参)" */,
    }`;

    export default {
        name: "form-pannel-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BList,
            PannelWid,
            FormWid
        },
        model: {
            prop: "pannelInfo"
        },
        props: {
            pannelInfo: {
                type: Object,
                required: true
            },
            formData: {
                type: Object,
                required: true
            },
            pannelTitle: {
                type: String,
                required: false,
            },
            pannelStyles: {
                type: String,
                required: false,
                default: ""
            },
            pannelData: {
                type: Object,
                required: false
            }
        },
        data(){
            return {

                //面板初始化样式
                pannel_styles: `flex-column bg-color-light w-30 round-sm ${this.pannelStyles}`,

                //面板初始化配置
                pannel_prams: {
                    matte: true,
                    matteColor: "rgba(40,40,40,.7)",
                    matteClose: "click",
                    ...this.pannelData,
                },

            }
        },
        computed: {

            //表单对象
            former(){
                return this.$refs.former;
            }

        },
        methods: {

            //设置表单项只读
            set_only_read(name){
                this.former.set_only_read(name);
            },

            //设置表单项可写
            set_write(name){
                this.former.set_write(name);
            },

        },
        watch: {

            //监听面板显示状态入参
            "pannelInfo.visible"(val){
                val === false && this.former.reset();
            }

        }
    }
</script>