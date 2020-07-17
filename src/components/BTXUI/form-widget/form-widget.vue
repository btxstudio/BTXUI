<template>
    <b-view>
        <b-view v-for="(item, index) of formData" :key="index"
            styles="flex-4 mrg-b-1"
            :states="{
                column: {
                    style: 'flex flex-column mrg-b-1.4',
                    state: layout.title_wrap
                }
            }">

            <!--标题区-->
            <b-view styles="flex-4"
                    :states="{
                        fixed_title_width: {
                            style: `w-${layout.title_width}`,
                            state: layout.title_width
                        },
                        column: {
                            style: 'mrg-b-.4',
                            state: layout.title_wrap
                        }
                    }">
                <b-icon v-if="item.icon" :icon="item.icon"
                        styles="mrg-r-1 fsize-1.4"/>
                <b-text v-if="item.text"
                        styles="mrg-r-1">
                    {{item.text}}
                </b-text>
            </b-view>

            <!--表单元素区-->
            <b-view styles="flex-grow bg-color-neutral round-sm pad-v-.3 pad-h-1"
                    :states="{
                        readonly: {
                            style: 'bg-color-none alpha-.8',
                            state: item.readonly
                        }
                     }">
                <b-input :type="item.type" :name="item.name" v-model="selected[item.name]"
                         :maxlength="item.maxlength"
                         :readonly="item.readonly"
                         :placeholder="item.placeholder" />
            </b-view>
        </b-view>

        <!--提交按钮-->
        <b-view v-if="submit" :styles="`mrg-t-2.4 p${submit.align || 'left'}`">
            <btn-widget @on_click="$_submit" :btn-text="submit.text" :btn-color="submit.btnColor" />
        </b-view>

    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BIcon from "@/components/BTXUI/core/b-icon";
    import BInput from "@/components/BTXUI/core/b-input";
    import BtnWidget from "@/components/BTXUI/btn-widget/btn-widget";

    export default {
        name: "form-widget",
        components: {
            BView,
            BText,
            BHot,
            BIcon,
            BInput,
            BtnWidget
        },
        /*
        * init-data{
        *   form-data: [
        *       {
        *           type: "表单元素类型",
        *           name: "表单元素数据键名",
        *           [* text: "表单元素字段"],
        *           [* icon: "表单元素图标"],
        *           [* maxlength: "字符数上限（限输入型表单元素）"],
        *           [* placeholder: "输入提示（限输入型表单元素）"],
        *           [* readonly: "只读"],
        *       },...
        *   ],
        *   selected（model）: {
        *       name（所选表单元素键名）: value（所选表单元素键值）,...
        *   },
        *   [* layout: {
        *       title_width: "表单元素标题宽度，默认单位 rem",
        *       title_wrap: "表单元素标题是否折行",
        *   }],
        *   [* submit: {
        *       text: "按钮文字",
        *       align: "对齐方式：默认 left、center、right",
        *       callback: "回调函数",
        *       [* btnColor: "按钮颜色"],
        *   }]
        * }
        * */
        model: {
            prop: "selected",
        },
        props: {
            formData: {
                type: Array,
                required: true
            },
            selected: {
                type: Object,
                required: true
            },
            layout: {
                type: Object,
                required: false,
                default: ()=>{
                    return {title_width: "", title_wrap: false}
                }
            },
            submit: {
                type: Object,
                required: false
            },
        },
        methods: {

            //提交表单
            $_submit(){
                this.submit && this.submit.callback(this.selected);
            }

        }
    }
</script>