<template>
    <pannel-widget v-bind="pannel_prams" v-model="visible">
        <b-list :styles="pannel_styles">
            <form-widget :form-data="formData" :selected="selected" />
        </b-list>
    </pannel-widget>
</template>

<script>
    import BList from "@/components/BTXUI/core/b-list";
    import PannelWidget from "@/components/BTXUI/pannel-widget/pannel-widget";
    import FormWidget from "@/components/BTXUI/form-widget/form-widget";

    export default {
        name: "form-pannel-widget",
        components: {
            BList,
            PannelWidget,
            FormWidget
        },
        /*
        * init-data{
        *   pannel-info（model）: {
        *       visible: "面板显示状态",
        *       selected: {
        *           name（所选表单元素键名）: value（所选表单元素键值）,...
        *       }
        *   },
        *   form-data: [
        *       {
        *           type: "表单元素类型",
        *           name: "表单元素数据键名",
        *           [* text: "表单元素字段"],
        *           [* icon: "表单元素图标"],
        *           [* maxlength: "字符数上限（限输入型表单元素）"],
        *           [* placeholder: "输入提示（限输入型表单元素）"],
        *       },...
        *   ],
        *   [* pannel-styles: "面板样式"],
        *   [* pannel-data: {
        *       [* pos: "面板定位（基于视口九宫格定位: 1-9）"],
        *       [* offset: {
        *           x: "水平方向位移 styles 值",
        *           y: "垂直方向位移 styles 值"
        *       },
        *       [* matte: "是否启用遮罩，默认不启用"],
        *       [* matteColor: "遮罩颜色"],
        *       [* matteZIndex: "遮罩 z 轴层级，默认为 9"],
        *       [* closeBtn: "是否启用关闭按钮"],
        *       [* matteClose: "遮罩自身点击关闭面板：click 单击、dblclick 双击"],
        *   }],
        * }
        * */
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
                type: Array,
                required: true
            },
            pannelStyles: {
                type: [String, Array],
                required: false,
                default: () => []
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
                pannel_styles: [
                    "bg-color-light",
                    "pad-2",
                    "w-30",
                    ...(Array.isArray(this.pannelStyles)? this.pannelStyles: this.pannelStyles.split(" ")),
                ],

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
                this.pannelInfo.visible = val;
            }

        }
    }
</script>