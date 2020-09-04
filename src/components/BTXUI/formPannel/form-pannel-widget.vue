<template>
    <pannel-widget v-bind="pannel_prams" v-model="visible">
        <b-view :styles="pannel_styles">
            <b-view v-if="pannelTitle" styles="pad-l-2">
                <b-view styles="line-b thick-1 pad-v-.7 line-neutral">{{pannelTitle}}</b-view>
            </b-view>
            <b-list styles="pad-2">
                <form-widget ref="former" v-bind="formData" :selected="selected" />
            </b-list>
        </b-view>
    </pannel-widget>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BList from "@/components/BTXUI/core/b-list";
    import PannelWidget from "@/components/BTXUI/pannel/pannel-widget";
    import FormWidget from "@/components/BTXUI/form/form-widget";

    const desc = ["该组件用于自定义弹窗交互操作。"],
        extend = [],
        dependent = ["form-widget", "pannel-widget", "b-list", "b-view"],
        api = null,
        init_data = `{
        pannelInfo: "（model）{
            visible: "面板显示状态",
            selected: {
                name（所选表单元素键名）: value（所选表单元素键值）,...
            }
        }",
        formData: "(参照：form-widget 组件入参)",
        /* pannelTitle: "面板标题" */,
        /* pannelStyles: "面板样式" */,
        /* pannelData: "(参照：pannel-widget 组件入参)" */,
    }`;

    export default {
        name: "form-pannel-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BList,
            PannelWidget,
            FormWidget
        },
        model: {
            prop: "pannelInfo",
            event: "on_click"
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

                //面板显示状态
                visible: this.pannelInfo.visible,

                //面板初始化样式
                pannel_styles: `flex-column bg-color-light w-30 round-sm ${this.pannelStyles}`,

                //面板初始化配置
                pannel_prams: {
                    matte: true,
                    matteColor: "rgba(40,40,40,.7)",
                    matteClose: "click",
                    ...this.pannelData,
                },

                //当前所选数据
                selected: this.pannelInfo.selected,

            }
        },
        watch: {

            //监听面板显示状态入参
            "pannelInfo.visible"(val){
                this.visible = val;
            },

            //监听面板显示状态出参
            visible(val){
                if(val === false) this.$refs.former.reset();
                this.pannelInfo.visible = val;
            }

        }
    }
</script>